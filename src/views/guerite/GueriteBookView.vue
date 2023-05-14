<script setup>
import Heading from "@/components/Heading.vue"
import VLoading from "@/components/VLoading.vue"
import { gueriteBookingService } from "@/services"
import { time2date } from "@/utils"
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const state = reactive({
  loading: true,
  data: null,
  error: false,
})

onMounted(async () => {
  state.data = await gueriteBookingService.getBook(route.params.bookId)
  state.loading = false
})
</script>

<template>
  <div>
    <div>
      <Heading
        tip="1814"
        title="Réservation Guerité"
        text="Merci pour votre réservation."
      />
    </div>

    <section>
      <div class="relative max-w-3xl mx-auto">
        <div v-if="state.loading">
          <v-loading />
        </div>
        <div v-else class="bg-neutral-800 shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between">
            <div>
              <h3 class="text-lg leading-6 font-medium text-white">
                {{ time2date(state.data.date) }} à midi -
                {{ state.data.peoples }} personnes
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-neutral-300">
                Détails de la de réservation
              </p>
            </div>
            <div>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-white',
                  state.data.verified ? 'bg-primary' : 'bg-sky-500',
                ]"
              >
                {{ state.data.verified ? "Confirmé" : "A confirmer" }}
              </span>
            </div>
          </div>
          <div class="border-t border-neutral-600 px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-primary">Prénom</dt>
                <dd class="mt-1 text-sm text-white">
                  {{ state.data.customerInfos.firstname }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-primary">Nom</dt>
                <dd class="mt-1 text-sm text-white">
                  {{ state.data.customerInfos.lastname }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-primary">Email</dt>
                <dd class="mt-1 text-sm text-white">
                  {{ state.data.customerInfos.email }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-primary">Téléphone</dt>
                <dd class="mt-1 text-sm text-white">
                  {{ state.data.customerInfos.phone }}
                </dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-primary">
                  Allergies ou intolérances
                </dt>
                <dd class="mt-1 text-sm text-white">
                  {{ state.data.customerInfos.notes }}
                </dd>
              </div>
            </dl>
          </div>
          <!-- <div class="p-4 flex justify-end">
            <div v-if="state.data.approved">
              <button class="button-danger-small">Annuler</button>
            </div>
            <div v-else class="space-x-2">
              <button class="button-info-small">Confirmer</button>
              <button class="button-danger-small">Annuler</button>
            </div>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>
