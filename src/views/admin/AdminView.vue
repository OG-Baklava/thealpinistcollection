<script setup>
import VTabs from "@/components/VTabs.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"
import { useAuthUserStore } from "@/stores/auth"

const tabs = [
  { name: "Paramètre généraux", to: { name: "AdminIndex" } },
  { name: "Nouveau produit", to: { name: "AdminAddProduct" } },
  { name: "Produits", to: { name: "AdminProducts" } },
  { name: "Réservation Guérite", to: { name: "AdminGueriteBooking" } },
  { name: "Menu Guérite", to: { name: "AdminGueriteMenu" } },
  { name: "Coupon Guérite", to: { name: "AdminGueriteCoupon" } },
]

const store = useAuthUserStore()
</script>

<template>
  <div>
    <LayoutContainer>
      <div class="flex justify-between mt-6">
        <h2
          class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
        >
          Administration
        </h2>
        <button class="button-primary-small" @click="store.logout()">
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
