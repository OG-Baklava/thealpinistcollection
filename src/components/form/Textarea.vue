<script setup>
import { useField } from "vee-validate"
import { toRefs } from "vue"

const props = defineProps({
  label: String,
  identifier: String,
  rows: Number,
  required: {
    type: Boolean,
    default: true,
  },
})

const { label, identifier, rows, required } = toRefs(props)
const isRequired = (value) => {
  if (value && value.trim()) {
    return true
  }
  return "Le champ est requis"
}
const { value, errorMessage } = useField(
  identifier,
  required.value ? isRequired : null
)
</script>

<template>
  <label
    :for="identifier"
    :class="['block text-sm font-medium text-primary']"
    >{{ label }}</label
  >
  <div class="mt-1">
    <textarea
      :id="identifier"
      v-model="value"
      :rows="rows"
      :class="[
        'py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white',
        errorMessage && errorMessage.length
          ? 'border-red-500 focus:ring-red-800 focus:border-red-800'
          : '',
      ]"
    />
  </div>
  <p class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
</template>
