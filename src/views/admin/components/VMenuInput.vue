<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: String,
  label: String,
  isTextarea: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["update:modelValue"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})
</script>

<template>
  <div>
    <label
      v-if="props.label"
      :class="['block text-sm font-medium text-primary']"
      >{{ label }}</label
    >
    <div class="mt-1">
      <template v-if="!isTextarea">
        <input
          v-model="value"
          type="text"
          :class="[
            'text-sm py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white disabled:bg-neutral-600',
          ]"
        />
      </template>
      <template v-else>
        <textarea
          v-model="value"
          rows="4"
          class="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white"
        />
      </template>
    </div>
  </div>
</template>
