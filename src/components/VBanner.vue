<script setup>
import { useSettingsStore } from "@/stores/settings"
import { time2date } from "@/utils"
import { XIcon } from "@heroicons/vue/solid"

const store = useSettingsStore()
</script>

<template>
  <!--
      Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
      your content from being obscured when the user scrolls to the bottom of the page.
    -->
  <div
    v-if="
      !store.holidayClosed &&
      !store.loading &&
      store.data &&
      store.data?.holiday?.active == true
    "
    class="pointer-events-none z-50 fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
  >
    <div
      class="pointer-events-auto border border-primary flex items-center justify-between gap-x-6 bg-neutral-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5"
    >
      <p class="text-sm leading-6 text-white">
        <strong class="font-semibold">Information</strong
        ><svg
          viewBox="0 0 2 2"
          class="mx-2 inline h-0.5 w-0.5 fill-current"
          aria-hidden="true"
        >
          <circle cx="1" cy="1" r="1" /></svg
        >Nous serons en vacances jusqu'au
        {{ time2date(store.data.holiday.date) }}.
      </p>
      <button
        type="button"
        class="-m-1.5 flex-none p-1.5"
        @click="store.closeHoldiayBanner()"
      >
        <span class="sr-only">Dismiss</span>
        <XIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
