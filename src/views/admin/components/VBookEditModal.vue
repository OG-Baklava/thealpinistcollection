<script setup>
import ErrorAlert from "@/components/alerts/Error.vue"
import VSpin from "@/components/VSpin.vue"
import { useModalStore } from "@/stores/modal"
import { DialogTitle } from "@headlessui/vue"

import { gueriteBookingService } from "@/services"
import { fmtDate, time2date } from "@/utils"
import { collection, orderBy, query, where } from "firebase/firestore"
import { Calendar } from "v-calendar"
import { computed, reactive } from "vue"
import { useRouter } from "vue-router"
import { useCollection, useFirestore } from "vuefire"

const db = useFirestore()
const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const store = useModalStore()

const state = reactive({
  loading: false,
  error: null,
})
const bookState = reactive({
  calendarDay: null,
  book: null,
})

const { pending, data } = useCollection(
  query(
    collection(db, "gueriteBookings").withConverter({
      fromFirestore: (snapshot) => {
        return { id: snapshot.id, data: snapshot.data() }
      },
      toFirestore: (product) => product,
    }),
    where("closed", "==", false),
    orderBy("date")
  )
)

const dates = computed(() => {
  if (pending.value == true) return []
  return data.value
    .filter((record) => record.data.available >= props.data.book.data.peoples)
    .map((record) => record.data.date.toDate())
})

const redDates = computed(() => {
  if (pending.value == true) return []
  return data.value
    .filter((record) => record.data.available < props.data.book.data.peoples)
    .map((record) => record.data.date.toDate())
})

const attr = computed(() => {
  if (!dates.value) return
  return [
    {
      dot: true,
      dates: dates.value,
    },
    {
      dot: "red",
      dates: redDates.value,
    },
  ]
})

const onSelect = (calendarDay) => {
  bookState.calendarDay = calendarDay
  if (!calendarDay.isDisabled) {
    let index = data.value
      .map((record) => record.data.date.toDate().setHours(0, 0, 0, 0).valueOf())
      .indexOf(calendarDay.date.setHours(0, 0, 0, 0).valueOf())
    bookState.book = data.value[index]
  }
}

const validate = async () => {
  state.loading = true
  try {
    await gueriteBookingService.moveBook(
      props.data.booking,
      bookState.book,
      props.data.book
    )
    store.closeModal()
    router.push({
      name: "AdminGueriteBook",
      params: { bookId: bookState.book.id },
    })
  } catch (error) {
    state.error = true
  }
  state.loading = false
}
</script>

<template>
  <div
    :class="[
      'inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6 bg-neutral-800',
    ]"
  >
    <div>
      <div class="text-center">
        <DialogTitle
          as="h3"
          :class="['text-lg leading-6 font-medium text-white']"
        >
          {{ props.data.title }}
        </DialogTitle>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {{ props.data.message }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="!pending" class="mt-10 flex flex-col justify-center px-4">
      <div>
        <Calendar
          is-dark
          is-expanded
          :available-dates="dates"
          :attributes="attr"
          @dayclick="onSelect"
        />
      </div>
      <div class="mt-12 flex flex-col space-y-7 flex-1">
        <h2 class="text-xl font-semibold leading-6 text-white">
          {{
            bookState.calendarDay
              ? `Déplacer la réservation du ${time2date(
                  props.data.book.data.date
                )} pour le ${fmtDate(bookState.calendarDay.date)}`
              : "Veuillez sélectionner une date"
          }}
        </h2>
        <template v-if="bookState.calendarDay">
          <div v-if="bookState.calendarDay.isDisabled">
            <ErrorAlert
              title="Réservation non disponible"
              text="La réservation est indsiponnible soit parce que la guérite est déjà complete soit elle n'est pas ouverte ce jour."
            />
          </div>
          <div v-else class="flex flex-col space-y-4 flex-1">
            <div class="grow space-y-4">
              <p class="text-neutral-300">
                Places disponibles {{ bookState.book.data.available }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="state.error" class="mt-5">
      <ErrorAlert
        title="Une une erreur est survenue"
        text="Le déplacement de la réservation n'a pas pu etre effectuer. Veuillez contactez l'administrateur."
      />
    </div>
    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
    >
      <button
        type="button"
        class="w-full button-primary-small sm:col-start-2 sm:text-sm"
        :disabled="
          bookState.book == null ||
          bookState.calendarDay == null ||
          bookState.calendarDay.isDisabled
        "
        @click="validate()"
      >
        <template v-if="state.loading"><VSpin /></template>
        <template v-else>Valider</template>
      </button>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 sm:mt-0 w-full button-danger-small"
        @click="store.closeModal()"
      >
        Annuler
      </button>
    </div>
  </div>
</template>
