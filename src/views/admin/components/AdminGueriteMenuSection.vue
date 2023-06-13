<script setup>
import { SunIcon } from "@heroicons/vue/outline"
import { TrashIcon } from "@heroicons/vue/solid"
import VMenuInput from "./VMenuInput.vue"

const props = defineProps({
  items: Array,
})
const emit = defineEmits(["onUpdate", "push", "sectionSplice"])

const onUpdate = (value, idx) => emit("onUpdate", value, idx)
const push = (value) => props.items.push(value)
const splice = (idx) => props.items.splice(idx, 1)
const sectionSplice = () => emit("sectionSplice")
</script>

<template>
  <div>
    <div class="flex flex-col">
      <div
        v-for="(item, idx) in props.items"
        :key="idx"
        class="flex items-center space-x-4 pb-2"
      >
        <VMenuInput
          :model-value="item"
          class="flex-1"
          @update:modelValue="(value) => onUpdate(value, idx)"
        />
        <div>
          <button
            type="button"
            class="rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            @click="splice(idx)"
          >
            <TrashIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <button class="button-danger-small" @click="sectionSplice">
        Supprimer section
      </button>
      <button class="button-primary-small" @click="push('(MODIFIER)')">
        Ajouter ligne
      </button>
    </div>
    <div>
      <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
    </div>
  </div>
</template>
