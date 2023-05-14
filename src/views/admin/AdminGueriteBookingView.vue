<script setup>
import VDatePicker from "@/components/VDatePicker.vue"
import VLoading from "@/components/VLoading.vue"
import Input from "@/components/form/Input.vue"
import { useNotificationStore } from "@/stores/notifications"
import { time2date } from "@/utils"
import { collection, doc, orderBy, query } from "firebase/firestore"
import { useForm } from "vee-validate"
import { reactive, ref } from "vue"
import { useCollection, useDocument, useFirestore } from "vuefire"

import { gueriteBookingService } from "@/services"
import AdminGueriteSettings from "./components/AdminGueriteSettings.vue"

const notifStore = useNotificationStore()
const modelDate = ref()
const db = useFirestore()
const { handleSubmit, resetForm } = useForm()
const state = reactive({
  sendLoading: false,
  modelDateError: false,
})

const onSubmit = handleSubmit(async (values) => {
  state.sendLoading = true
  if (!modelDate.value) {
    state.modelDateError = true
    state.sendLoading = false
    return
  }
  state.modelDateError = false
  try {
    let d = modelDate.value
    d.setHours(3, 0, 0, 0)
    await gueriteBookingService.createBookDate({
      available: values.peoples,
      peoples: values.peoples,
      closed: false,
      date: d,
    })
    state.success = true
    resetForm()
    modelDate.value = null
  } catch (error) {
    notifStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
  state.sendLoading = false
})

const { pending, data } = useCollection(
  query(
    collection(db, "gueriteBookings").withConverter({
      fromFirestore: (snapshot) => {
        return { id: snapshot.id, data: snapshot.data() }
      },
      toFirestore: (product) => product,
    }),
    orderBy("date")
  )
)

const { pending: pendingSettings, data: settings } = useDocument(
  doc(collection(db, "bookSettings"), "guerite")
)
</script>

<template>
  <div>
    <section class="py-6 md:py-10 lg:py-12">
      <div v-if="pending || pendingSettings">
        <v-loading />
      </div>
      <div v-else class="gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div>
          <AdminGueriteSettings
            :active="settings.active"
            :book-amount="settings.bookAmount"
          />
        </div>
        <div>
          <form class="max-w-xl" @submit="onSubmit">
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <Input
                  identifier="peoples"
                  label="Nombre de personnes"
                  type="number"
                />
              </div>
              <div>
                <label
                  for="date"
                  :class="['block text-sm font-medium text-primary']"
                  >Date</label
                >
                <div class="mt-1">
                  <VDatePicker v-model="modelDate" />
                </div>
                <p
                  v-if="state.modelDateError"
                  class="mt-2 text-sm text-red-600"
                >
                  Le champ est requis
                </p>
              </div>
              <div class="sm:col-start-2">
                <button type="submit" class="button-primary float-right">
                  Entrer
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          class="lg:col-span-2 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8"
        >
          <div
            v-for="(book, idx) in data"
            :key="book.id"
            class="bg-neutral-800 shadow overflow-hidden sm:rounded-lg"
          >
            <div class="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 class="text-lg leading-6 font-medium text-white">
                  {{ time2date(book.data.date) }}
                  - {{ book.data.available }}/{{ book.data.peoples }}
                  personnes
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-neutral-300">
                  Détails de la réservation
                </p>
              </div>
              <div v-if="book.data.closed">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-white bg-red-500"
                >
                  Fermé
                </span>
              </div>
              <div v-else>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-white',
                    book.data.available > 0 ? 'bg-primary' : 'bg-gray-500',
                  ]"
                >
                  {{ book.data.available > 0 ? "Ouvert" : "Complet" }}
                </span>
              </div>
            </div>
            <div class="p-4 flex justify-end">
              <div class="space-x-2">
                <router-link
                  :to="{
                    name: 'AdminGueriteBook',
                    params: { bookId: book.id },
                  }"
                  class="button-info-small"
                  >voir</router-link
                >
                <button
                  v-if="book.data.closed"
                  class="button-primary-small"
                  @click="gueriteBookingService.reopen(book.id)"
                >
                  Re-ouvrir
                </button>
                <button
                  v-else
                  class="button-danger-small"
                  @click="gueriteBookingService.close(book.id)"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
