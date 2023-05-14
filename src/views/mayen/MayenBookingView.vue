<script setup>
import VDatePicker from "@/components/VDatePicker.vue"
import VSpin from "@/components/VSpin.vue"
import ErrorAlert from "@/components/alerts/Error.vue"
import SuccessAlert from "@/components/alerts/Success.vue"
import Input from "@/components/form/Input.vue"
import { mayenBookingService } from "@/services"
import { useForm } from "vee-validate"
import { reactive, ref } from "vue"

const { handleSubmit, resetForm } = useForm()
const modelDate = ref()
const state = reactive({
  error: false,
  bookRef: null,
  success: false,
  sendError: false,
  sendLoading: false,
})

const onSubmit = handleSubmit(async (values) => {
  state.sendLoading = true
  if (!modelDate.value) {
    state.error = true
    state.sendLoading = false
    return
  }
  try {
    const bookRef = await mayenBookingService.create({
      ...values,
      dates: modelDate.value,
    })
    state.bookRef = bookRef
    state.success = true
    resetForm()
    modelDate.value = null
  } catch (error) {
    state.sendError = true
  }
  state.sendLoading = false
})
</script>

<template>
  <div>
    <section>
      <div class="text-center">
        <p class="mx-auto max-w-3xl text-lg leading-6 text-neutral-300">
          Remplissez le formulaire ci dessous pour soumettre une demande d'offre
        </p>
      </div>
      <div
        class="relative mt-8 sm:mt-12 max-w-2xl mx-auto p-8 rounded-lg shadow bg-neutral-800"
      >
        <form @submit="onSubmit">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <Input identifier="firstname" label="Prénom" type="text" />
            </div>
            <div>
              <Input identifier="lastname" label="Nom" type="text" />
            </div>
            <div class="sm:col-span-2">
              <Input identifier="email" label="Email" type="email" />
            </div>
            <div class="sm:col-span-2">
              <Input
                identifier="phone"
                label="Numéro de téléphone"
                type="text"
                placeholder="+41 00 000 00 00"
              />
            </div>
            <div>
              <label
                for="date"
                :class="['block text-sm font-medium text-primary']"
                >Dates</label
              >
              <div class="mt-1">
                <VDatePicker v-model="modelDate" :range="true" />
              </div>
              <p v-if="state.error" class="mt-2 text-sm text-red-600">
                Le champ est requis
              </p>
            </div>
            <div>
              <Input
                identifier="peoples"
                label="Nombre de personnes"
                type="number"
              />
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="w-full button-primary">
                <template v-if="state.sendLoading">
                  <v-spin />
                </template>
                <template v-else>Envoyer</template>
              </button>
            </div>
            <div v-if="state.sendError" class="sm:col-span-2">
              <ErrorAlert
                title="Une erreur est survenue !"
                text="Veuillez nous contactez par email. (voir ci-dessous)"
              />
            </div>
            <div v-if="state.success" class="sm:col-span-2">
              <SuccessAlert
                title="Votre demande a été envoyée avec succès !"
                :text="`Un retour vous sera fait prochainement. Votre numéro de réservation est le suivant: ${state.bookRef.id}`"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
