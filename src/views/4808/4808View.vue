<script setup>
import Heading from "@/components/Heading.vue"
import VTabs from "@/components/VTabs.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"

const tabs = [
  { name: "Infos", to: { name: "4808Index" } },
  { name: "Réservation", to: { name: "4808Booking" } },
]
</script>

<template>
  <div>
    <div>
      <Heading
        tip="4808"
        title="La Cuisine étoilée de Pierre & Delphine"
        text="Une gastronomie décomplexée qui s’invite chez vous. Un chef qui
          cuisine dans la vôtre pour faire venir les étoiles jusqu’à votre
          table."
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
