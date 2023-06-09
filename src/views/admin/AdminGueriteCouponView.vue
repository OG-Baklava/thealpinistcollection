<script setup>
import VFilters from "@/components/VFilters.vue"
import VLoading from "@/components/VLoading.vue"
import VSpin from "@/components/VSpin.vue"
import Input from "@/components/form/Input.vue"
import { gueriteBookingService } from "@/services"
import { useNotificationStore } from "@/stores/notifications"
import { collection, orderBy, query } from "firebase/firestore"
import { useForm } from "vee-validate"
import { computed, reactive, ref } from "vue"
import { useCollection, useFirestore } from "vuefire"

const sortOptions = ref([
  {
    name: "Identifiant",
    id: "identifier",
  },
  {
    name: "Montant",
    id: "amount",
  },
  {
    name: "Etat",
    id: "used",
  },
])

const db = useFirestore()
const notifStore = useNotificationStore()
const sortby = ref(sortOptions.value[0])
const { handleSubmit, resetForm } = useForm({
  initialValues: {
    identifier: "1814-",
  },
})
const state = reactive({
  sendLoading: false,
  error: false,
})

const { pending, data } = useCollection(
  computed(() => {
    return query(
      collection(db, "gueriteCoupon").withConverter({
        fromFirestore: (snapshot) => {
          return { id: snapshot.id, data: snapshot.data() }
        },
        toFirestore: (product) => product,
      }),
      orderBy(sortby.value.id)
    )
  })
)

const onSortChange = (option) => {
  let index = sortOptions.value.map((n) => n.id).indexOf(option.id)
  if (index == -1) return
  sortby.value = sortOptions.value[index]
}

const onSubmit = handleSubmit(async (values) => {
  state.sendLoading = true
  try {
    await gueriteBookingService.addCoupon(values.identifier, values.amount)
  } catch (error) {
    notifStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
  state.sendLoading = false
  resetForm()
})
</script>

<template>
  <div>
    <section class="py-6 md:py-10 lg:py-12">
      <div v-if="pending">
        <v-loading />
      </div>
      <div v-else class="gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div>
          <form class="max-w-xl" @submit="onSubmit">
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <Input
                  identifier="identifier"
                  label="Identifiant"
                  type="text"
                  placeholder="1814-XXXX"
                />
              </div>
              <div>
                <Input identifier="amount" label="Montant" type="number" />
              </div>
              <div class="sm:col-start-2">
                <button type="submit" class="button-primary-small float-right">
                  <template v-if="state.sendLoading"><VSpin /></template>
                  <template v-else>Ajouter</template>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="lg:col-span-2 flex justify-end">
          <VFilters
            :options="sortOptions"
            :current="sortby"
            label="Trier par"
            @on-change="onSortChange"
          />
        </div>
        <div
          class="lg:col-span-2 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8"
        >
          <div
            v-for="coupon in data"
            :key="coupon.id"
            class="bg-neutral-800 shadow overflow-hidden sm:rounded-lg"
          >
            <div class="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 class="text-lg leading-6 font-medium text-white">
                  {{ coupon.data.identifier }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-neutral-300">
                  {{ coupon.data.amount.toFixed(2) }}.- CHF
                </p>
              </div>
              <div v-if="coupon.data.used">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-white bg-red-500"
                >
                  Déjà utilisé
                </span>
              </div>
              <div v-else>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-white bg-primary',
                  ]"
                >
                  Dispo
                </span>
              </div>
            </div>
            <div class="p-4 flex justify-end">
              <div class="space-x-2">
                <button
                  class="button-danger-small"
                  :disabled="coupon.data.used"
                  @click="gueriteBookingService.closeCoupon(coupon.id)"
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
