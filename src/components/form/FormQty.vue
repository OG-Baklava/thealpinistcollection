<script setup>
import { MinusSmIcon, PlusSmIcon } from "@heroicons/vue/solid"

const props = defineProps({
  max: Number,
  min: {
    type: Number,
    default: 1,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(["update:modelValue"])

const minusClick = () => {
  if (props.modelValue == props.min) return
  emit("update:modelValue", props.modelValue - props.step)
}
const plusClick = () => {
  if (props.modelValue == props.max) return
  emit("update:modelValue", props.modelValue + props.step)
}
</script>

<template>
  <div class="flex space-x-4">
    <button
      class="border-neutral-600 text-sodisemiblack hover:border-primary text-primary relative inline-flex items-center p-2 border text-sm font-medium"
      @click="minusClick"
    >
      <MinusSmIcon class="h-5 w-5" />
    </button>
    <span
      class="border-neutral-600 text-neutral-300 text-sodisemiblack relative inline-flex items-center py-2 px-4 border text-sm font-medium"
    >
      {{ props.modelValue }}
    </span>
    <button
      class="border-neutral-600 text-sodisemiblack hover:border-primary text-primary relative inline-flex items-center p-2 border text-sm font-medium"
      @click="plusClick"
    >
      <PlusSmIcon class="h-5 w-5" />
    </button>
  </div>
</template>
