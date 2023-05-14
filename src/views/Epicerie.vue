<script setup>
import Heading from "@/components/Heading.vue"
import AppContent from "@/layouts/AppContent.vue"

const collections = [
  {
    name: "Sucré",
    to: { name: "ShopSweet" },
    imageSrc: "/images/epicerie/dirty.jpg",
    imageAlt:
      "Brown leather key ring with brass metal loops and rivets on wood table.",
    description:
      "Keep your phone, keys, and wallet together, so you can lose everything at once.",
  },
  {
    name: "Salé",
    to: { name: "ShopDirty" },
    imageSrc: "/images/epicerie/sweet.jpg",
    imageAlt:
      "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
    description:
      "The rest of the house will still be a mess, but your desk will look great.",
  },
  {
    name: "Liqueurs",
    to: { name: "ShopLiquors" },
    imageSrc: "/images/epicerie/liquors.jpg",
    imageAlt:
      "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
    description:
      "Be more productive than enterprise project managers with a single piece of paper.",
  },
]
</script>

<template>
  <div>
    <Heading
      tip="2018"
      title="L’épicerie"
      text="une épicerie fine pour emmener les secrets de la cuisine de Pierre dans vos plats à la maison ou les offrir en cadeau. Des produits comme autant de petites touches d’étoiles à glisser dans vos plats pour les twister jusqu’au sommet. "
    />
    <section>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div>
            <h2
              id="collection-heading"
              class="text-2xl font-extrabold tracking-tight text-white"
            >
              Collections
            </h2>
            <p class="mt-4 text-base text-neutral-300">Les collections</p>
          </div>
          <div>
            <router-link to="/shop" class="button-primary-small my-auto"
              >Découvrir</router-link
            >
          </div>
        </div>

        <div
          class="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8"
        >
          <router-link
            v-for="collection in collections"
            :key="collection.name"
            :to="collection.to"
            class="group block"
          >
            <div
              aria-hidden="true"
              class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
            >
              <img
                :src="collection.imageSrc"
                :alt="collection.imageAlt"
                class="w-full h-full object-center object-cover"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold text-white">
              {{ collection.name }}
            </h3>
            <!-- <p class="mt-2 text-sm text-neutral-300">
              {{ collection.description }}
            </p> -->
          </router-link>
        </div>
      </div>
    </section>
    <section>
      <!-- <div class="max-w-prose mx-auto mb-8 lg:mb-16">
        <warning-alert
          text="Le shop de l'épicerie est en cours de préparation et sera bientôt disponible"
          title="Shop bientot disponible"
        />
      </div> -->
      <!-- <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none"
        >
          <div>
            <h2
              class="text-base text-primary font-semibold tracking-wide uppercase"
            >
              Pourquoi 2018
            </h2>
            <h3
              class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Le début de l'aventure
            </h3>
          </div>
        </div>
        <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div class="relative lg:row-start-1 lg:col-start-2">
            <div class="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <img
                    class="rounded-lg shadow-lg object-cover object-center"
                    src="/images/epicerie/home.jpeg"
                    alt="Whitney leaning against a railing on a downtown street"
                    width="1184"
                    height="1376"
                  />
                </div>
                <figcaption class="mt-3 flex text-sm text-neutral-300">
                  <span class="ml-2">Photograph by Marcus O’Leary</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div class="mt-8 lg:mt-0">
            <div class="text-base max-w-prose mx-auto lg:max-w-none">
              <p class="text-lg text-white">
                <i>La Délicieuse</i>, une sauce à salade aux ingrédients top
                secrets qui rendront vos salades addictives.
                <i>Le Waooo Effect</i>, un poivre au citron pour faire de
                l’effet. <i>Le Dulce des Alpes</i> le pot est petit et
                heureusement, parce qu’une fois qu’on y a goûté on peut plus
                s’en passer… Des produits fumés à la montagne, avec des herbes
                aromatiques du Valais, ou fusionnés à du vin typiquement
                valaisan comme
                <i>Le rubis de sel à l’Humagne.</i>
              </p>
            </div>
            <div
              class="mt-5 prose prose-green text-white prose-invert mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1"
            >
              <h3>Info</h3>
              <p>
                Commandez nos produits sur notre boutique en ligne ou
                retrouvez-les…
              </p>
              <ul role="list">
                <li>La Fromathèque à Martigny</li>
                <li>L’Œnothèque Fol’terre à Fully</li>
                <li>La Potagère à St Pierre de Clage</li>
                <li>Le Terroir à Crans-Montana</li>
                <li>La Fée Morand à Crans-Montana</li>
                <li>La Piccolina à Crans-Montana</li>
                <li>Le Tirebouchon à Crans Montana</li>
                <li>Chez Martine à Lens</li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
      <AppContent>
        <h3>Pourquoi 2018 ?</h3>
        <p>Le début de l'aventure</p>
        <figure>
          <img class="w-full rounded-lg" src="/images/epicerie/home.jpeg" />
          <!-- <figcaption>
            Sagittis scelerisque nulla cursus in enim consectetur quam.
          </figcaption> -->
        </figure>
        <p>
          <i>La Délicieuse</i>, une sauce à salade aux ingrédients top secrets
          qui rendront vos salades addictives. <i>Le Waooo Effect</i>, un poivre
          au citron pour faire de l’effet. <i>Le Dulce des Alpes</i> le pot est
          petit et heureusement, parce qu’une fois qu’on y a goûté on peut plus
          s’en passer… Des produits fumés à la montagne, avec des herbes
          aromatiques du Valais, ou fusionnés à du vin typiquement valaisan
          comme
          <i>Le rubis de sel à l’Humagne.</i>
        </p>
      </AppContent>
    </section>
  </div>
</template>
