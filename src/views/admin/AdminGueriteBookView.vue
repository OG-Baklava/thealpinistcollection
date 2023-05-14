<script setup>
import VLoading from "@/components/VLoading.vue"
import VSpin from "@/components/VSpin.vue"
import FormQty from "@/components/form/FormQty.vue"
import Input from "@/components/form/Input.vue"
import Textarea from "@/components/form/Textarea.vue"
import { useModalStore } from "@/stores/modal"
import { useNotificationStore } from "@/stores/notifications"
import { time2date } from "@/utils"
import { collection, doc, orderBy, query, where } from "firebase/firestore"
import { useForm } from "vee-validate"
import { computed, markRaw, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import { useCollection, useDocument, useFirestore } from "vuefire"
import VBookEditModal from "./components/VBookEditModal.vue"

import { gueriteBookingService } from "@/services"

const { handleSubmit } = useForm()
const db = useFirestore()
const notificationsStore = useNotificationStore()
const modalStore = useModalStore()
const state = reactive({
  sendError: false,
  sendLoading: false,
  peoples: null,
})
const route = useRoute()
const bookRef = computed(() =>
  doc(collection(db, "gueriteBookings"), route.params.bookId)
)
const bookingsRef = computed(() => {
  return query(
    collection(db, "gueriteCustomerBooking").withConverter({
      fromFirestore: (snapshot) => {
        return { id: snapshot.id, data: snapshot.data() }
      },
      toFirestore: (product) => product,
    }),
    where(
      "bookRef",
      "==",
      doc(collection(db, "gueriteBookings"), route.params.bookId)
    ),
    orderBy("verified", "desc")
  )
})

watch(
  () => route.params.bookId,
  (newId) => {
    if (newId === undefined) return
    bookRef.value = doc(collection(db, "gueriteBookings"), newId)
  }
)

const { pending, data } = useDocument(bookRef)
const { pending: loadingBookings, data: bookData } = useCollection(bookingsRef)

watch(pending, (isLoading) => {
  if (isLoading == false) state.peoples = data.value.available
})

const saveDoc = async () => {
  state.sendLoading = true
  try {
    await gueriteBookingService.setAvailible(route.params.bookId, state.peoples)
    notificationsStore.add({
      title: "Succès",
      text: "Le nombre de disponibilté de la réservation a été mise a jour !",
      type: "success",
    })
  } catch (err) {
    state.sendError = true
    notificationsStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
  state.sendError = false
  state.sendLoading = false
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await gueriteBookingService.addBook({
      bookRef: doc(collection(db, "gueriteBookings"), route.params.bookId),
      customerInfos: {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        notes: values.notes ? values.notes : null,
        phone: values.phone,
      },
      peoples: values.peoples,
      date: data.value.date,
      verified: true,
      checkoutSessionId: null,
      amoutTotal: values.amoutTotal,
      bookCost: values.bookCost,
      couponAmount: 0,
      couponRef: null,
    })
    notificationsStore.add({
      title: "Succès",
      text: "La réservation a bien été ajoutée",
      type: "success",
    })
    state.peoples = data.value.available - values.peoples
    if (state.peoples < 0) {
      notificationsStore.add({
        title: "Erreur",
        text: "Vous ne pouvez pas ajouter une réservation avec plus de personnes qu'il n'en reste !",
        type: "error",
      })
      return
    }
    await saveDoc()
  } catch (error) {
    notificationsStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
})

const deleteBook = async (book) => {
  try {
    await gueriteBookingService.deleteBook(book.id)
    notificationsStore.add({
      title: "Succès",
      text: "La réservation a bien été supprimée",
      type: "success",
    })
    if (book.data.verified) {
      state.peoples = data.value.available + book.data.peoples
      await saveDoc()
    }
  } catch (error) {
    notificationsStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la suppression !",
      type: "error",
    })
  }
}

const editBook = (book) => {
  modalStore.openModal({
    title: "Modification date réservation",
    message:
      "Vous êtes sur le point de modifier une date pour une réservation !",
    callback: () => null,
    component: markRaw(VBookEditModal),
    book: book,
    booking: {
      id: route.params.bookId,
      data: data.value,
    },
  })
}
</script>

<template>
  <div>
    <section class="py-6 md:py-10 lg:py-12">
      <div v-if="pending || loadingBookings || state.peoples == null">
        <v-loading />
      </div>
      <div v-else class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-none">
          <div class="overflow-hidden bg-neutral-800 rounded-lg shadow">
            <div
              class="border-b border-neutral-600 bg-neutral-800 px-4 py-5 sm:px-6"
            >
              <div
                class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
              >
                <div class="ml-4 mt-2">
                  <h3 class="text-base font-semibold leading-6 text-white">
                    {{ time2date(data.date) }} {{ data.available }}/{{
                      data.peoples
                    }}
                    personnes
                  </h3>
                </div>
                <div class="ml-4 mt-2 flex-shrink-0 flex space-x-2">
                  <button
                    type="button"
                    class="button-primary-small"
                    :disabled="
                      state.peoples == null || state.peoples == data.available
                    "
                    @click="saveDoc()"
                  >
                    <template v-if="state.sendLoading">
                      <v-spin />
                    </template>
                    <template v-else>Sauvegarder</template>
                  </button>
                  <button
                    v-if="data.closed"
                    type="button"
                    class="button-info-small"
                    @click="gueriteBookingService.reopen(route.params.bookId)"
                  >
                    Re-ouvrir
                  </button>
                  <button
                    v-else
                    type="button"
                    class="button-danger-small"
                    @click="gueriteBookingService.close(route.params.bookId)"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
            <div class="border-b border-neutral-600 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-primary">
                    Nb. personnes Max
                  </dt>
                  <dd class="mt-1 text-sm text-white">{{ data.peoples }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-primary">
                    Nb. personnes restantes
                  </dt>
                  <dd class="mt-1">
                    <FormQty
                      :max="data.peoples"
                      :min="1"
                      :model-value="state.peoples"
                      @update:modelValue="
                        (newValue) => (state.peoples = newValue)
                      "
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <ul role="list" class="divide-y divide-neutral-600">
              <li v-for="book in bookData" :key="book.id">
                <div class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <div class="truncate text-sm font-medium text-primary">
                      {{ book.data.customerInfos.firstname }}
                      {{ book.data.customerInfos.lastname }}
                      <span class="text-white"
                        >- {{ book.data.peoples }} personne(s)</span
                      >
                    </div>
                    <div class="ml-2 flex flex-shrink-0">
                      <span
                        :class="[
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-white',
                          book.data.verified ? 'bg-primary' : 'bg-red-600',
                        ]"
                        >{{
                          book.data.verified ? "Confirmé" : "Non confirmé"
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="mt-2 flex justify-between">
                    <div class="sm:flex">
                      <div
                        class="flex items-center space-x-4 text-sm text-neutral-300"
                      >
                        <div>
                          <span class="text-primary">Montant payé:</span>
                          {{ book.data.amoutTotal }}.-
                        </div>
                        <div>
                          <span class="text-primary">Cout pp:</span>
                          {{ book.data.bookCost }}.-
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="book.data.couponRef"
                      class="ml-2 flex items-center text-sm text-neutral-300"
                    >
                      <span class="text-primary">Bon cadeau:</span>
                      {{ book.data.couponAmount }}.-
                    </div>
                  </div>
                  <div class="mt-2 flex justify-between">
                    <div class="sm:flex">
                      <div class="flex items-center text-sm text-neutral-300">
                        {{ book.data.customerInfos.email }}
                        {{ book.data.customerInfos.phone }}
                      </div>
                    </div>
                    <div
                      v-if="book.data.customerInfos.notes"
                      class="ml-2 flex items-center text-sm text-neutral-300"
                    >
                      <span class="text-primary">Alergies:</span>
                      {{ book.data.customerInfos.notes }}
                    </div>
                  </div>
                  <div class="mt-2 flex justify-end space-x-2">
                    <div>
                      <button
                        class="button-primary-small"
                        @click="editBook(book)"
                      >
                        Modifier
                      </button>
                    </div>
                    <div>
                      <button
                        class="button-danger-small"
                        @click="deleteBook(book)"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <form
          class="mt-8 sm:mt-12 max-w-2xl mx-auto p-8 rounded-lg shadow bg-neutral-800"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <Input identifier="firstname" label="Prénom" type="text" />
            </div>
            <div>
              <Input identifier="lastname" label="Nom" type="text" />
            </div>
            <div>
              <Input identifier="email" label="Email" type="email" />
            </div>
            <div>
              <Input
                identifier="phone"
                label="Numéro de téléphone"
                type="text"
                placeholder="+41 00 000 00 00"
              />
            </div>
            <div class="col-span-2">
              <div class="flex space-x-4">
                <div>
                  <Input
                    identifier="peoples"
                    label="Nombre de personnes"
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    identifier="amoutTotal"
                    label="Montant payé"
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    identifier="bookCost"
                    label="Cout par personne"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <Textarea
                identifier="notes"
                label="Allergies ou intolérances"
                :rows="4"
                :required="false"
              />
            </div>
            <div class="sm:col-start-2">
              <button type="submit" class="button-primary float-right">
                Continuer
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
