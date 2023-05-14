<template>
  <div>
    <div>
      <heading
        title="Nos partenaires"
        text="Commandez nos produits sur notre boutique en ligne ou retrouvez-les chez nos partenaires"
      />
    </div>
    <section>
      <layout-container>
        <dl
          class="max-w-2xl mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-4 lg:gap-x-8"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="border-t border-neutral-600 transition-colors pt-4 hover:border-primary cursor-pointer"
          >
            <dt class="font-medium text-white">{{ feature.name }}</dt>
            <dd class="mt-2 text-sm text-neutral-300">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </layout-container>
    </section>
  </div>
</template>

<script>
import Heading from "@/components/Heading.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"

export default {
  components: {
    Heading,
    LayoutContainer,
  },
  setup() {
    const features = [
      { name: "Les Mines de Sel", description: "Bex" },
      { name: "La Fromathèque", description: "Martigny" },
      {
        name: "L’Œnothèque Fol’terre",
        description: "Fully",
      },
      {
        name: "La Potagère",
        description: "Saint Pierre de Clage",
      },
      {
        name: "Le Terroir",
        description: "Crans-Montana",
      },
      {
        name: "Néa Bar",
        description: "Crans-Montana",
      },
      {
        name: "La Piccolina",
        description: "Crans-Montana",
      },
      {
        name: "Le Tirebouchon",
        description: "Crans-Montana",
      },
      {
        name: "Chez Martine",
        description: "Lens",
      },
      {
        name: "Del Genio",
        description: "Sion",
      },
      {
        name: "Iris",
        description: "Riddes",
      },
    ]
    return {
      features,
    }
  },
}
</script>
