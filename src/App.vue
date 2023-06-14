<script setup>
import { onBeforeMount, onMounted } from "vue"
import VBanner from "./components/VBanner.vue"
import VModal from "./components/VModal.vue"
import VNoficiations from "./components/VNotifications.vue"
import VTransitionFade from "./components/VTransitionFade.vue"
import Footer from "./layouts/Footer.vue"
import Header from "./layouts/Header.vue"
import { useAuthUserStore } from "./stores/auth"
import { useSettingsStore } from "./stores/settings"

const store = useAuthUserStore()
const settings = useSettingsStore()

onBeforeMount(() => {
  store.fetchUser()
})

onMounted(() => settings.fetch())
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
    <VBanner />
  </teleport>
</template>
