<script setup>
import { useField } from "vee-validate"
import { toRefs } from "vue"

const props = defineProps({
  label: String,
  identifier: String,
  text: String,
  required: {
    type: Boolean,
    default: false,
  },
  val: {
    type: String,
    default: "",
  },
})

const { label, identifier, text, required, val } = toRefs(props)
const isRequired = (value) => {
  if (value) {
    return true
  }
  return "Le champ est requis"
}
const { value, errorMessage } = useField(
  identifier,
  required.value ? isRequired : null
)
value.value = val.value != "" ? val.value : value.value
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="identifier"
        v-model="value"
        :name="identifier"
        type="checkbox"
        class="focus:ring-primary h-4 w-4 text-primary border-neutral-600 rounded"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="identifier" class="font-medium text-primary">{{
        label
      }}</label>
      <span id="comments-description" class="text-neutral-300"
        >{{ " " }}{{ text }}</span
      >
    </div>
  </div>
</template>
