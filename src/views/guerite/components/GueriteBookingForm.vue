<script setup>
import Input from "@/components/form/Input.vue"

import { useForm } from "vee-validate"

const emit = defineEmits(["validate"])

const { handleSubmit } = useForm()
const onSubmit = handleSubmit((values) => {
  emit("validate", values)
})
</script>

<template>
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
      <!-- <div class="sm:col-span-2">
        <Textarea
          identifier="notes"
          label="Allergies ou intolérances"
          :rows="4"
          :required="false"
        />
      </div> -->
      <div class="sm:col-start-2">
        <button type="submit" class="button-primary float-right">
          Continuer
        </button>
      </div>
    </div>
  </form>
</template>
