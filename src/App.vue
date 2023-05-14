<script setup>
import { onBeforeMount } from "vue"
import VNoficiations from "./components/VNotifications.vue"
import VTransitionFade from "./components/VTransitionFade.vue"
import Footer from "./layouts/Footer.vue"
import Header from "./layouts/Header.vue"
import { useAuthUserStore } from "./stores/auth"
import VModal from "./components/VModal.vue"

const store = useAuthUserStore()
onBeforeMount(() => {
  store.fetchUser()
})
</script>

<template>
  <div class="flex flex-col h-full min-h-screen bg-neutral-900">
    <Header />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <VTransitionFade>
          <component :is="Component" />
        </VTransitionFade>
      </router-view>
    </main>
    <Footer />
  </div>
  <teleport to="body">
    <VNoficiations />
    <VModal />
  </teleport>
</template>
