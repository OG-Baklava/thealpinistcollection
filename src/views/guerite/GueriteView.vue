<script setup>
import Heading from "@/components/Heading.vue"
import VTabs from "@/components/VTabs.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"

const tabs = [
  { name: "Infos", to: { name: "Guerite1814Index" } },
  { name: "Menu", to: { name: "Guerite1814Menu" } },
  { name: "Réservation", to: { name: "Guerite1814Booking" } },
]
</script>

<template>
  <div>
    <div>
      <Heading
        tip="1814"
        title="La Guérite"
        text="une table éphémère gastronomique étoilée dans une guérite. Une atmosphère intimiste, 20 convives réunis pour partager bien plus que des étoiles. "
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
