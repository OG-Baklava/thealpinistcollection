<script setup>
import VSpin from "@/components/VSpin.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import ErrorAlert from "@/components/alerts/Error.vue"
import FormQty from "@/components/form/FormQty.vue"
import Input from "@/components/form/Input.vue"
import AppContent from "@/layouts/AppContent.vue"
import { bookingService, gueriteBookingService } from "@/services"
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue"
import { loadStripe } from "@stripe/stripe-js"

import { DateCustom } from "@/utils"
import {
  Timestamp,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { Calendar } from "v-calendar"
import { useForm } from "vee-validate"
import { computed, onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useCollection, useFirestore } from "vuefire"
import GueriteBookingForm from "./components/GueriteBookingForm.vue"

const router = useRouter()
const db = useFirestore()
const { handleSubmit } = useForm()
const state = reactive({
  error: false,
  loading: false,
  bookAmount: 0,
  sendError: false,
  sendLoading: false,
  couponLoading: false,
  couponError: false,
})
const bookState = reactive({
  calendarDay: null,
  book: null,
  peoples: 1,
  couponAmount: 0,
  couponRef: null,
  couponId: null,
})
const terms = ref(false)
const steps = ref([
  { id: 1, name: "Choisissez une date", status: "current" },
  {
    id: 2,
    name: "Renseignez vos infos",
    status: "upcoming",
  },
  { id: 3, name: "Confirmation", status: "upcoming" },
])
const currentStep = ref(steps.value[0])
const customerInfos = ref(null)
const minDate = ref(new DateCustom().addDays(2).setHours(0, 0, 0, 0))

onMounted(async () => {
  state.loading = true
  try {
    const data = await bookingService.getGueriteSettings()
    state.bookAmount = data.bookAmount
  } catch (err) {
    state.error = false
  }
  state.loading = false
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
    .map((record) => record.data.date.toDate())
    .filter((d) => d.setHours(0, 0, 0, 0) >= minDate.value)
})

const attr = computed(() => {
  if (!dates.value) return
  return [
    {
      dot: true,
      dates: dates.value,
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
const confirmStep = (currentId, nextId) => {
  let currentIndex = steps.value.map((n) => n.id).indexOf(currentId)
  let nextIndex = steps.value.map((n) => n.id).indexOf(nextId)
  if (currentIndex == -1 || nextIndex == -1) return
  steps.value[currentIndex].status = "complete"
  steps.value[nextIndex].status = "current"
  currentStep.value = steps.value[nextIndex]
}

const goBack = (nextId) => {
  let currentIndex = steps.value.map((n) => n.id).indexOf(currentStep.value.id)
  let nextIndex = steps.value.map((n) => n.id).indexOf(nextId)
  if (currentIndex == -1 || nextIndex == -1) return
  steps.value[currentIndex].status = "upcoming"
  steps.value[nextIndex].status = "current"
  currentStep.value = steps.value[nextIndex]
}

const onFormValidate = (values) => {
  customerInfos.value = values
  confirmStep(2, 3)
}

const removeCoupon = () => {
  bookState.couponRef = null
  bookState.couponId = null
  bookState.couponAmount = 0
}

const checkCoupon = handleSubmit(async (values) => {
  state.couponLoading = true
  try {
    let res = await gueriteBookingService.checkCoupon(
      values.coupon,
      bookState.peoples
    )
    bookState.couponRef = res.couponRef
    bookState.couponAmount = res.couponAmount
    bookState.couponId = res.couponId
  } catch (err) {
    state.couponError = true
    setTimeout(() => {
      state.couponError = false
    }, 5000)
    bookState.couponRef = null
    bookState.couponId = null
    bookState.couponAmount = 0
  }
  state.couponLoading = false
})

const checkout = async () => {
  state.sendLoading = true
  try {
    const data = {
      bookId: bookState.book.id,
      peoples: bookState.peoples,
      customerInfos: customerInfos.value,
      date: Timestamp.fromDate(bookState.calendarDay.date),
      couponRef: bookState.couponRef,
    }
    const res = await gueriteBookingService.create(data)
    if (res.bookingId != null) {
      router.push({
        name: "Guerite1814Book",
        params: { bookId: res.bookingId },
      })
    }
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_GUERITE)
    await stripe.redirectToCheckout({
      sessionId: res.sessionId,
    })
    state.sendLoading = false
  } catch (error) {
    state.sendLoading = false
    state.sendError = true
  }
}

const total = computed(
  () => bookState.peoples * state.bookAmount - bookState.couponAmount
)
</script>

<template>
  <div>
    <section>
      <div class="relative isolate bg-neutral-900">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <figure>
            <blockquote class="text-center text-lg text-neutral-300">
              <p>
                Venir à La Guérite, c’est se donner rendez-vous, se réjouir de
                cet instant, de notre rencontre et d’une expérience éphémère et
                indélébile à la fois. C’est une parenthèse pour prendre congé du
                rythme effréné de la vie, pour s’accorder du temps pour soi. Un
                temps, le vôtre, le nôtre, qui a une valeur.
              </p>
              <p>
                Dès cette année, pour nous permettre d’honorer,e nombre de dates
                et de places limité pour chacun de nos voyages gastronomiques,
                pour respecter pleinement tous les ingrédients de cette Nature
                qui nourrit nos plats et toujours allumer des étoiles dans vos
                yeux comme dans vos assiettes, nous vous invitons à effectuer un
                paiement partiel au moment de votre réservation.
              </p>
              <p>
                Nous sommes reconnaissants du succès que vous réservez à La
                Guérite, de votre impatience à nous retrouver et de votre
                présence fidèle année après année. Nous nous réjouissons de vous
                accueillir et de vivre ces instants hors du temps avec vous.
              </p>
              <p>
                Afin de prendre le temps de savourer l’instant, notre concept
                reste le même. Les repas se déroulent sur le midi avec un rendez
                vous fixé à 11h15 sur le parking des Remparts dans le vieux
                bourg de Saillon.
              </p>
              <p class="italic mt-4">
                « L’infrastructure de la cuisine de notre guerite ne permet pas
                à Pierre de s’adapter à vos différentes intolérances ou
                allergies. Nous nous en excusons d’avance et nous vous
                remercions pour votre compréhension. »
              </p>
            </blockquote>
            <figcaption class="mt-10">
              <!-- <img
                class="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> -->
              <div
                class="mt-4 flex items-center justify-center space-x-3 text-base"
              >
                <div class="font-semibold text-white">Pierre Crepaud</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  class="fill-neutral-300"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div class="text-neutral-300">Delphine Gillioz</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      <nav aria-label="Progress" class="py-12 lg:py-20">
        <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
          <li v-for="step in steps" :key="step.name" class="md:flex-1">
            <button
              v-if="step.status === 'complete'"
              class="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              @click="goBack(step.id)"
            >
              <span class="text-sm font-medium text-primary"
                >Etape {{ step.id }}</span
              >
              <span class="text-sm font-medium text-neutral-300">{{
                step.name
              }}</span>
            </button>
            <div
              v-else-if="step.status === 'current'"
              class="flex flex-col w-full border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              aria-current="step"
            >
              <span class="text-sm font-medium text-primary"
                >Etape {{ step.id }}</span
              >
              <span class="text-sm font-medium text-white">{{
                step.name
              }}</span>
            </div>
            <div
              v-else
              class="group flex w-full flex-col border-l-4 border-neutral-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
            >
              <span class="text-sm font-medium text-neutral-600"
                >Etape {{ step.id }}</span
              >
              <span class="text-sm font-medium text-neutral-600">{{
                step.name
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
      <VTransitionFade>
        <div
          v-if="!state.loading && !pending && currentStep.id == 1"
          class="md:grid md:grid-cols-2 md:divide-x md:divide-neutral-400"
        >
          <div class="md:pr-14">
            <Calendar
              is-dark
              is-expanded
              :available-dates="dates"
              :attributes="attr"
              :min-date="minDate"
              @dayclick="onSelect"
            />
          </div>
          <div class="mt-12 md:mt-0 md:pl-14 flex flex-col space-y-7 flex-1">
            <h2 class="text-xl font-semibold leading-6 text-white">
              {{
                bookState.calendarDay
                  ? `Réserver pour le ${bookState.calendarDay.date.toLocaleDateString()}`
                  : "Veuillez sélectionner une date"
              }}
            </h2>
            <template v-if="bookState.calendarDay">
              <div v-if="bookState.calendarDay.isDisabled">
                <ErrorAlert
                  title="Réservation non disponible"
                  text="La réservation est impossible soit parce que la guérite est déjà complete soit elle n'est pas ouverte."
                />
              </div>
              <div v-else class="flex flex-col space-y-4 flex-1">
                <div class="grow space-y-4">
                  <p class="text-neutral-300">
                    Places disponibles {{ bookState.book.data.available }}
                  </p>
                  <FormQty
                    :max="bookState.book.data.available"
                    :model-value="bookState.peoples"
                    @update:modelValue="
                      (newValue) => (bookState.peoples = newValue)
                    "
                  />
                </div>

                <button
                  class="button-primary-small justify-self-end !max-w-xs"
                  @click="confirmStep(1, 2)"
                >
                  Continuer
                </button>
              </div>
            </template>
          </div>
        </div>
        <div
          v-else-if="currentStep.id == 2"
          class="relative mt-8 sm:mt-12 max-w-2xl mx-auto p-8 rounded-lg shadow bg-neutral-800"
        >
          <GueriteBookingForm @validate="onFormValidate" />
        </div>
        <div
          v-else-if="currentStep.id == 3"
          class="md:grid md:grid-cols-3 sm:space-x-12"
        >
          <div class="col-span-2">
            <div class="bg-neutral-800 shadow md:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-base font-semibold leading-6 text-white">
                  Résumé de la réservation
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-neutral-300">
                  Veuillez vérifiez l'intégrité de vos données
                </p>
              </div>
              <div class="border-t border-neutral-600 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-neutral-600">
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-neutral-300">
                      Nom complet
                    </dt>
                    <dd class="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {{ customerInfos.lastname }} {{ customerInfos.firstname }}
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-neutral-300">
                      Adresse Email
                    </dt>
                    <dd class="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {{ customerInfos.email }}
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-neutral-300">
                      Numéro de téléphone
                    </dt>
                    <dd class="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {{ customerInfos.phone }}
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-neutral-300">Date</dt>
                    <dd class="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {{ bookState.calendarDay.date.toLocaleDateString() }}
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-neutral-300">
                      Nombre de personnes
                    </dt>
                    <dd class="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {{ bookState.peoples }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <AppContent class="!mr-auto !ml-0">
              <h3>Conditions générales de vente</h3>
              <ul>
                <li>
                  Un montant partiel de 100.- par personne est à régler lors de
                  la réservation
                </li>
                <li>Ce montant sera déduit de votre note finale</li>
              </ul>
              <h3>Conditions d’annulation</h3>
              <ul>
                <li>
                  Ce montant vous sera intégralement restitué dans le cas d’une
                  annulation faite par écrit à l’adresse
                  info@thealpinistcollection.com jusqu’à 10 jours avant la date
                  réservée
                </li>
                <li>
                  Il vous sera également remboursé dans le cas où nous ne
                  pourrions pas assurer l’ouverture de la guérite
                </li>
                <li>
                  Lors d’une annulation tardive (moins de 10 jours avant la date
                  du repas), le montant partiel du paiement est perdu, il ne
                  sera donc pas remboursé et ne pourra pas être utilisé comme un
                  crédit pour une future réservation
                </li>
              </ul>
            </AppContent>
          </div>
          <div>
            <div
              aria-labelledby="summary-heading"
              class="bg-neutral-800 shadow md:rounded-lg px-4 py-6 md:p-6 lg:p-8"
            >
              <h2 id="summary-heading" class="text-lg font-medium text-white">
                Panier
              </h2>

              <dl class="mt-6 space-y-4">
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-neutral-300">
                    Acompte par personnes
                  </dt>
                  <dd class="text-sm font-medium text-white">CHF 100.00</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-neutral-300">Nombre de personnes</dt>
                  <dd class="text-sm font-medium text-white">
                    {{ bookState.peoples }}
                  </dd>
                </div>
                <div
                  v-if="bookState.couponId"
                  class="flex items-center justify-between"
                >
                  <dt class="text-sm text-neutral-300">Bon de réduction</dt>
                  <dd class="text-sm font-medium text-white">
                    CHF {{ bookState.couponAmount.toFixed(2) }}
                  </dd>
                </div>
                <div
                  class="flex items-center justify-between border-t border-gray-200 pt-4"
                >
                  <dt class="text-base font-medium text-neutral-300">Total</dt>
                  <dd class="text-base font-medium text-white">
                    CHF
                    {{ total.toFixed(2) }}
                  </dd>
                </div>
              </dl>

              <SwitchGroup as="div" class="flex items-center mt-6">
                <Switch
                  v-model="terms"
                  :class="[
                    terms ? 'bg-primary' : 'bg-neutral-900',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      terms ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]"
                  />
                </Switch>
                <SwitchLabel as="span" class="ml-3 text-sm">
                  <span class="font-medium text-neutral-300"
                    >En cochant cette case vous acceptez nos conditions
                    générales</span
                  >
                </SwitchLabel>
              </SwitchGroup>

              <form v-if="!bookState.couponId" @submit="checkCoupon">
                <div class="mt-6">
                  <Input
                    identifier="coupon"
                    label="Bon de réduction"
                    type="text"
                  />
                </div>
                <div class="mt-6">
                  <button class="button-info-small w-full" type="submit">
                    <template v-if="state.couponLoading">
                      <v-spin />
                    </template>
                    <template v-else>Appliquer le bon de réduction</template>
                  </button>
                </div>
              </form>
              <div v-else class="mt-6">
                <button
                  class="button-danger-small w-full"
                  @click="removeCoupon"
                >
                  Supprimer le bon
                </button>
              </div>
              <div v-if="state.couponError" class="mt-6">
                <ErrorAlert
                  title="Une erreur est survenue !"
                  text="Le coupon est introuvable ou son motant a déjà été utilisé"
                />
              </div>

              <div class="mt-6">
                <button
                  :disabled="!terms"
                  class="button-primary-small w-full"
                  @click="checkout()"
                >
                  <template v-if="state.sendLoading">
                    <v-spin />
                  </template>
                  <template v-else>{{
                    total > 0 ? "Continuer vers le paiement" : "Confirmer"
                  }}</template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </VTransitionFade>
      <!-- <div class="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:py-40 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-5">
            <h2 class="text-2xl font-bold leading-10 tracking-tight text-white">
              Questions fréquentes
            </h2>
            <p class="mt-4 text-base leading-7 text-neutral-300">
              Vous ne trouvez pas la réponse que vous cherchez ? Contactez notre
              <router-link
                to="/contact"
                class="font-semibold text-primary hover:text-opacity-90"
                >équipe d'assistance</router-link
              >
              à la clientèle
            </p>
          </div>
          <div class="mt-10 lg:col-span-7 lg:mt-0">
            <dl class="space-y-10">
              <div v-for="faq in faqs" :key="faq.question">
                <dt class="text-base font-semibold leading-7 text-white">
                  {{ faq.question }}
                </dt>
                <dd class="mt-2 text-base leading-7 text-neutral-300">
                  {{ faq.answer }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div> -->
    </section>
  </div>
</template>
