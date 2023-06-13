<script setup>
import VSpin from "@/components/VSpin.vue"
import { SunIcon } from "@heroicons/vue/outline"
import AdminGueriteMenuSection from "./components/AdminGueriteMenuSection.vue"
import VMenuInput from "./components/VMenuInput.vue"

const props = defineProps({
  menu: Object,
  sendLoading: Boolean,
})
const emit = defineEmits([
  "onUpdateItem",
  "onUpdateParam",
  "addSection",
  "sectionSplice",
  "onSave",
])

const onUpdateItem = (...args) => emit("onUpdateItem", args)
const onUpdateParam = (param, value) => emit("onUpdateParam", param, value)
const addSection = () => emit("addSection")
</script>

<template>
  <div>
    <div class="flex flex-col space-y-4">
      <div>
        <VMenuInput
          name="title"
          label="Titre"
          :model-value="menu.title"
          @update:modelValue="(value) => onUpdateParam('title', value)"
        />
      </div>
      <div>
        <VMenuInput
          name="text"
          label="Texte"
          :model-value="menu.text"
          is-textarea
          @update:modelValue="(value) => onUpdateParam('text', value)"
        />
      </div>

      <div>
        <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
      </div>

      <div>
        <AdminGueriteMenuSection
          v-for="(section, idx) in props.menu.sections"
          :key="idx"
          :items="section.items"
          class="space-y-4 py-2"
          @onUpdate="(val, itemIdx) => onUpdateItem(val, itemIdx, idx)"
          @section-splice="emit('sectionSplice', idx)"
        />
      </div>

      <div class="flex justify-end">
        <button class="button-primary-small" @click="addSection">
          Ajouter section
        </button>
      </div>

      <div>
        <VMenuInput
          name="price"
          label="Texte prix"
          :model-value="menu.price"
          @update:modelValue="(value) => onUpdateParam('price', value)"
        />
      </div>

      <div class="flex justify-end pt-6 border-t border-neutral-600">
        <button class="button-primary-small" @click="emit('onSave')">
          <template v-if="props.sendLoading"> <VSpin /> </template
          ><template v-else>Sauvegarder</template>
        </button>
      </div>
    </div>
  </div>
</template>
