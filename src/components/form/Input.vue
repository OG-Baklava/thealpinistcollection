<template>
  <label
    :for="identifier"
    :class="['block text-sm font-medium text-primary']"
    >{{ label }}</label
  >
  <div class="mt-1">
    <input
      :id="identifier"
      v-model="value"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'text-sm py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white disabled:bg-neutral-600',
        errorMessage && errorMessage.length
          ? 'border-red-500 focus:ring-red-800 focus:border-red-800'
          : '',
      ]"
    />
  </div>
  <p class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
</template>

<script>
import { useField } from "vee-validate"
import { toRefs } from "vue"

export default {
  props: {
    label: String,
    type: String,
    identifier: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    val: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { label, type, identifier, disabled, required, placeholder, val } =
      toRefs(props)
    const isRequired = (value) => {
      if (value) {
        if (type.value != "number" && value.trim()) return true
        return true
      }
      if (type.value == "number" && value == 0) return true
      return "Le champ est requis"
    }
    const { value, errorMessage } = useField(
      identifier,
      required.value ? isRequired : null
    )
    value.value = val.value.length > 0 ? val.value : value.value
    return {
      label,
      type,
      identifier,
      value,
      errorMessage,
      placeholder,
      emit,
      disabled,
    }
  },
}
</script>
