<script setup>
import FormCheckbox from "@/components/form/FormCheckbox.vue"
import Input from "@/components/form/Input.vue"
import { bookingService } from "@/services"
import { useForm } from "vee-validate"
import { reactive } from "vue"

const props = defineProps({
  active: Boolean,
  bookAmount: Number,
})
const { handleSubmit, meta } = useForm({
  initialValues: { ...props },
})
const state = reactive({
  loading: false,
  error: false,
})
const onSettingsSubmit = handleSubmit(async (values) => {
  state.loading = true
  try {
    await bookingService.updateGueriteSettings(values)
    state.error = false
  } catch (err) {
    state.error = true
  }
  state.loading = false
})
</script>

<template>
  <form class="max-w-xl" @submit="onSettingsSubmit">
    <div class="grid grid-cols-1 gap-y-6">
      <div>
        <Input
          identifier="bookAmount"
          label="Montant par personne"
          type="number"
        />
      </div>
      <div>
        <FormCheckbox
          identifier="active"
          label="Actif"
          text="Contrôle l'ouverture de la guérite"
        />
      </div>
      <div>
        <button
          type="submit"
          class="button-primary float-right"
          :disabled="!meta.dirty"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  </form>
</template>
