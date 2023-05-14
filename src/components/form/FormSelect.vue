<template>
  <div>
    <label :for="identifier" class="block text-sm font-medium text-primary">{{
      label
    }}</label>
    <select
      :id="identifier"
      v-model="value"
      :name="identifier"
      :class="[
        'mt-1 block w-full pl-3 pr-10 py-2 text-base text-white bg-neutral-800 focus:outline-none sm:text-sm rounded-md',
        errorMessage && errorMessage.length
          ? 'border-red-500 focus:ring-red-800 focus:border-red-800'
          : 'border-neutral-600 focus:ring-primary focus:border-primary',
      ]"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <p class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { toRefs } from "vue"
import { useField } from "vee-validate"

export default {
  props: {
    label: String,
    identifier: String,
    options: Array,
    required: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { label, identifier, options, required } = toRefs(props)
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
    return {
      label,
      identifier,
      options,
      value,
      errorMessage,
      emit,
    }
  },
}
</script>
