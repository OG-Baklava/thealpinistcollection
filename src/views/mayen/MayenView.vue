<script setup>
import Heading from "@/components/Heading.vue"
import VTabs from "@/components/VTabs.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"

const tabs = [
  { name: "Infos", to: { name: "MayenIndex" } },
  { name: "Réservation", to: { name: "MayenBooking" } },
]
</script>

<template>
  <div>
    <div>
      <Heading
        tip="1842"
        title="Le Mayen"
        text="un mayen dans les pâturages de Prarion en-dessus d’Isérables, près des mélèzes centenaires de Balavaud."
      />
    </div>
    <section>
      <LayoutContainer>
        <v-tabs :tabs="tabs" :is-alt="true" />
        <router-view v-slot="{ Component }">
          <VTransitionFade>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </VTransitionFade>
        </router-view>
      </LayoutContainer>
    </section>
  </div>
</template>
