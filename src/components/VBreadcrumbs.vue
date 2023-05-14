<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid"

const props = defineProps({
  breads: Array,
  returnLink: String,
})
</script>

<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <router-link
        :to="{ name: props.returnLink }"
        class="flex items-center text-sm font-medium text-white hover:text-primary"
      >
        <ChevronLeftIcon
          class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-white"
          aria-hidden="true"
        />
        Retour
      </router-link>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4">
        <li v-for="(bread, idx) in props.breads" :key="idx">
          <div :class="['flex', idx % 2 != 0 ? 'items-center' : '']">
            <ChevronRightIcon
              v-if="idx % 2 != 0"
              class="flex-shrink-0 h-5 w-5 text-white"
            />
            <router-link
              :to="bread.to"
              :class="[
                'text-sm font-medium text-neutral-300 hover:text-primary',
                idx % 2 != 0 ? 'ml-4 ' : '',
              ]"
              exact-active-class="text-primary"
              >{{ bread.name }}</router-link
            >
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
