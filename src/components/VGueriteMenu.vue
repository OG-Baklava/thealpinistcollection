<script setup>
import AppContent from "@/layouts/AppContent.vue"
import { SunIcon } from "@heroicons/vue/outline"
const props = defineProps({
  menu: Object,
})
</script>

<template>
  <AppContent class="uppercase" :text-center="true">
    <h2>{{ props.menu.title }}</h2>
    <p class="italic">
      {{ props.menu.text }}
    </p>
    <div class="not-prose">
      <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
    </div>
    <template v-for="(section, idx) in menu.sections" :key="idx">
      <p>
        <span v-for="item in section.items" :key="item">{{ item }}</span>
      </p>
      <div class="not-prose">
        <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
      </div>
    </template>
    <p class="italic lowercase">{{ props.menu.price }}</p>
  </AppContent>
</template>
