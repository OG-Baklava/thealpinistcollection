<template>
  <div>
    <section>
      <AppContent>
        <figure>
          <img class="w-full rounded-lg" src="/images/mayen/mayen4.jpg" />
          <!-- <figcaption>
            Sagittis scelerisque nulla cursus in enim consectetur quam.
          </figcaption> -->
        </figure>
        <p>
          Un lieu pour se déconnecter et se reconnecter. Si vous pouvez
          rejoindre le Mayen en voiture, vous pouvez aussi laisser votre voiture
          à Riddes, monter en téléphérique et y arriver à pied depuis Isérables
          (1h30-2h00 de marche), pour que la montée au mayen fasse aussi partie
          de votre expérience. Là-haut, vous vous retrouverez, vous retrouverez
          aussi les créations de Pierre, dans des mets simples et traditionnels
          à vous cuisiner à l’envi.
        </p>
        <h3>Pourquoi 1842 ?</h3>
        <p>
          1842, c’est l’année de la construction du mayen original. Un mayen
          transmis de génération en génération dans la famille de Delphine. Un
          lieu hors du temps.
        </p>
        <figure>
          <img class="w-full rounded-lg" src="/images/mayen/mayen1.jpg" />
          <!-- <figcaption>
            Sagittis scelerisque nulla cursus in enim consectetur quam.
          </figcaption> -->
        </figure>
        <h3>Equipement</h3>
        <p>Notre mayen est entièrement équipé. Vous y serez comme chez vous.</p>
        <ul role="list">
          <li>Produits de base</li>
          <li>literie</li>
          <li>linges</li>
          <li>*chauffage électrique</li>
          <li>cuisine équipée (four à raclonette, caquelon à fondue)</li>
          <li>four à pizza extérieur</li>
          <li>BBQ & charbon</li>
          <li>parking à proximité (5 mn à pied)</li>
        </ul>
        <p>
          Nous pouvons vous préparer si vous les commandez à l’avance, moyennant
          des frais supplémentaires.
        </p>
        <dl class="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-1">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <CheckIcon
                class="absolute h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <p class="ml-9 text-lg leading-6 font-medium text-white">
                {{ feature.name }}
              </p>
            </dt>
            <dd class="ml-9 text-base text-neutral-300 text-justify">
              <p>{{ feature.description }}</p>
            </dd>
          </div>
        </dl>
        <figure>
          <img class="w-full rounded-lg" src="/images/mayen/mayen3.jpg" />
          <!-- <figcaption>
            Sagittis scelerisque nulla cursus in enim consectetur quam.
          </figcaption> -->
        </figure>
        <h3>Infos pratiques</h3>
        <dl class="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-1">
          <div v-for="info in infos" :key="info.name" class="relative">
            <dt>
              <component
                :is="info.icon"
                :class="['absolute h-6 w-6', info.iconColor]"
                aria-hidden="true"
              />
              <p
                class="not-prose ml-9 text-lg leading-6 font-medium text-white"
              >
                {{ info.name }}
              </p>
            </dt>
            <dd
              v-if="info.description"
              class="ml-9 text-base text-neutral-300 text-justify"
            >
              <p>{{ info.description }}</p>
            </dd>
          </div>
        </dl>
        <h3>Réservation</h3>
        <p>
          Déconnectez-vous au milieu de la Nature avec tout le confort d’un
          mayen rénové.
        </p>
        <ul role="list">
          <li>Minimum 2 nuits</li>
          <li>Maximum 6 personnes</li>
          <li>2 chambres doubles</li>
          <li>1 chambre avec 2 lits simples</li>
        </ul>
      </AppContent>
      <div class="max-w-prose mx-auto text-center pt-10">
        <router-link
          :to="{ name: 'MayenBooking' }"
          class="button-primary text-white not-prose"
          >Demander une offre</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import Heading from "@/components/Heading.vue"
import AppContent from "@/layouts/AppContent.vue"
import { CheckIcon, BanIcon, ExclamationIcon } from "@heroicons/vue/outline"

const features = [
  {
    name: "Kit fondue",
    description:
      "Fromage à fondue de Balavaud 200g par personne, tomates confites de notre collection, so crunchy, pain, vin pour la fondue.",
  },
  {
    name: "Kit raclonette",
    description:
      "Fromage à raclette de Balavaud 270g par personne, pickles de courgettes de notre collection, pomme de terre, sélection d’herbes sauvages de notre collection.",
  },
  {
    name: "Kit apéro",
    description:
      "Produits de la collection et vins de la Cave Corbassière à Saillon disponibles sur www.corbassiere.ch et directement depuis notre boutique en ligne.",
  },
]

const infos = [
  {
    name: "Le Mayen est non fumeur à l’intérieur",
    icon: BanIcon,
    iconColor: "text-red-400",
  },
  {
    name: "Les chiens sont acceptés sous votre responsabilité",
    icon: ExclamationIcon,
    iconColor: "text-orange-300",
    description: "Tout dommage vous sera facturé.",
  },
  {
    name: "Le Mayen se trouve à 20 mn d’Isérables, de Nendaz et des commerces",
    icon: CheckIcon,
    iconColor: "text-primary",
  },
  {
    name: "Accessible en voiture (parking à 5 minutes à pied)",
    icon: CheckIcon,
    iconColor: "text-primary",
    description:
      " Le Mayen est aussi accessible depuis Riddes en téléphérique jusqu’à Isérables, compter 1h30-2h00 de marche depuis Isérables pour y arriver.",
  },
  {
    name: "Le restaurant Chalet des Alpes se trouve à 5 minutes",
    icon: CheckIcon,
    iconColor: "text-primary",
  },
  {
    name: "Le restaurant du lac de Tracouet à 1 heure à pied",
    icon: CheckIcon,
    iconColor: "text-primary",
  },
]

export default {
  components: {
    Heading,
    AppContent,
    CheckIcon,
  },
  setup() {
    return {
      features,
      infos,
    }
  },
}
</script>
