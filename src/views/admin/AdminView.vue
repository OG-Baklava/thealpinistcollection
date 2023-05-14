<template>
  <div>
    <LayoutContainer>
      <div class="flex justify-between mt-6">
        <h2
          class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
        >
          Administration
        </h2>
        <button class="button-primary-small" @click="logout()">
          Se déconnecter
        </button>
      </div>
      <v-tabs :tabs="tabs" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </LayoutContainer>
  </div>
</template>

<script>
import VTabs from "@/components/VTabs.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"
import { useAuthUserStore } from "@/stores/auth"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid"

const tabs = [
  { name: "Nouveau produit", to: { name: "AdminIndex" }, current: true },
  { name: "Produits", to: { name: "AdminProducts" } },
  { name: "Réservation Guérite", to: { name: "AdminGueriteBooking" } },
  { name: "Coupon Guérite", to: { name: "AdminGueriteCoupon" } },
]

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    LayoutContainer,
    VTabs,
  },
  setup() {
    const store = useAuthUserStore()
    return {
      tabs,
      logout: async () => await store.logout(),
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
