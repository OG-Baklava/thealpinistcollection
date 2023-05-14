<script setup>
import Input from "@/components/form/Input.vue"
import Textarea from "@/components/form/Textarea.vue"
import { userService } from "@/services"
import { useAuthUserStore } from "@/stores/auth"
import { useForm } from "vee-validate"

const store = useAuthUserStore()
const [lastname, firstname] = store.user.displayName.split(" ")
const profile = await userService.getProfile(store.user.uid)

const formValues = {
  email: store.user.email,
  firstname: firstname,
  lastname: lastname,
  ...(profile.phone && { phone: profile.phone }),
  ...(profile.notes && { notes: profile.notes }),
  ...(profile.place && { place: profile.place }),
}
const { meta, handleSubmit } = useForm({
  initialValues: formValues,
})

const onSubmit = handleSubmit(async (values) => {
  await userService.updateProfile(
    {
      phone: values.phone,
      notes: values.notes,
      place: values.place,
    },
    store.user.uid
  )
})
</script>

<template>
  <div>
    <form
      class="bg-neutral-800 shadow sm:rounded-md p-4 sm:p-6"
      @submit="onSubmit"
    >
      <div>
        <h2
          id="payment-details-heading"
          class="text-lg leading-6 font-medium text-white"
        >
          Détails personnels
        </h2>
        <p class="mt-1 text-sm text-neutral-300">
          Mettez a jour vos informations personnelles pour aider lors d'un
          processus de réservation de l'un de nos services
        </p>
      </div>
      <div class="mt-6 grid grid-cols-4 gap-6">
        <div class="col-span-4 sm:col-span-2">
          <Input identifier="firstname" label="Prénom" type="text" disabled />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <Input identifier="lastname" label="Nom" type="text" disabled />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <Input identifier="email" label="Email" type="email" disabled />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <Input
            identifier="phone"
            label="Numéro de téléphone"
            type="text"
            placeholder="+41 00 000 00 00"
          />
        </div>
        <div class="col-span-4">
          <Input
            identifier="place"
            label="Adresse"
            type="text"
            placeholder="Rue des Raccard 4, 1908 Riddes"
          />
        </div>
        <div class="col-span-4">
          <Textarea
            identifier="notes"
            label="Allergies ou intolérances"
            :rows="4"
            :required="false"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button class="button-primary-small" :disabled="!meta.dirty">
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>
