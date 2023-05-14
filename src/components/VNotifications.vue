<script setup>
import { useNotificationStore } from "@/stores/notifications"
import { BanIcon, CheckCircleIcon } from "@heroicons/vue/outline"
import { XIcon } from "@heroicons/vue/solid"

const icons = {
  success: {
    icon: CheckCircleIcon,
    color: "text-green-400",
  },
  error: {
    icon: BanIcon,
    color: "text-red-400",
  },
}

const store = useNotificationStore()
const close = (index) => store.remove(index)
</script>

<template>
  <div
    aria-live="assertive"
    class="z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div
      v-if="store.notifications"
      class="w-full flex flex-col items-center space-y-4 sm:items-end"
    >
      <transition-group
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="notification in store.notifications"
          :key="notification"
          class="max-w-sm w-full shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-neutral-900"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="icons[notification.raw.type].icon"
                  :class="['h-6 w-6', icons[notification.raw.type].color]"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-white">
                  {{ notification.raw.title }}
                </p>
                <p class="mt-1 text-sm text-neutral-300">
                  {{ notification.raw.text }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="rounded-md inline-flex transition-colors text-white hover:text-neutral-300"
                  @click="close(notification.id)"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
