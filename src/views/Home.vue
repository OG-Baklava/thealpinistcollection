<template>
  <div>
    <section class="py-12 md:py-20 lg:py-24">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative">
          <!-- <img class="mx-auto h-16" src="/images/logo.png" alt="Logo" /> -->
          <blockquote class="mt-10">
            <div
              class="max-w-3xl mx-auto text-center text-xl leading-9 font-medium text-white"
            >
              <p>
                Des étoiles bien plus que dans vos assiettes. Des étoiles que
                Pierre & Delphine savent allumer dans vos yeux et dans vos cœurs
                parce qu’ensemble ils réussissent à créer cette alchimie des
                sens, ces instants de vie qu’on aimerait suspendre.
                <br />Des moments qui resteront gravés dans l’authenticité et la
                simplicité d’un temps hors du temps. Vivre un moment
                exceptionnel sans superflu. Vivre un moment éphémère indélébile.
              </p>
              <p class="text-neutral-300 mt-4">
                <i>Nous aimons rêver, venez rêver avec nous.</i>
              </p>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
    <section class="relative py-12 md:py-20 lg:py-24">
      <div
        class="hidden absolute top-0 inset-x-0 h-1/2 bg-neutral-900 lg:block"
        aria-hidden="true"
      />
      <div class="max-w-7xl mx-auto bg-neutral-800 lg:bg-transparent lg:px-8">
        <div class="lg:grid lg:grid-cols-12">
          <div
            class="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent"
          >
            <div
              class="absolute inset-x-0 h-1/2 bg-neutral-900 lg:hidden"
              aria-hidden="true"
            />
            <div
              class="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0"
            >
              <div
                class="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1"
              >
                <img
                  class="object-cover object-center rounded-3xl shadow-2xl"
                  src="/images/bg-about.jpg"
                  alt="About"
                />
              </div>
            </div>
          </div>

          <div
            class="relative bg-neutral-800 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:shadow-lg lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center"
          >
            <div
              class="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6"
            >
              <h2 class="text-3xl font-extrabold text-white">
                Pierre Crepaud, Delphine Gillioz…
              </h2>
              <p class="text-lg text-white text-justify">
                Il est chef étoilé, elle croit aux étoiles, Des étoiles, qui les
                font rêver, avancer, créer. La Nature & la Montagne c’est leur
                inspiration. À 4 mains, ils sont les alchimistes de 4
                expériences à vivre au cœur du Valais.
                <router-link
                  to="/4808"
                  class="text-primary hover:border-b hover:border-primary"
                >
                  Du 4808, la Cuisine étoilée de Pierre & Delphine chez vous </router-link
                >à la
                <router-link
                  to="/4808"
                  class="text-primary hover:border-b hover:border-primary"
                  >Guérite 1814</router-link
                >, du
                <router-link
                  to="/4808"
                  class="text-primary hover:border-b hover:border-primary"
                  >Mayen 1842</router-link
                >
                à leur {{ " " }}
                <router-link
                  to="/4808"
                  class="text-primary hover:border-b hover:border-primary"
                  >Epicerie 2018</router-link
                >, ils créent une gastronomie, un plaisir des sens et des
                moments de vie ultra décomplexés, inattendus, authentiques et
                conviviaux.
              </p>
              <p class="text-lg text-white italic">
                Les étoiles, c’est… dans vos yeux qu’ils aiment les allumer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 md:py-20 lg:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="block text-base text-center text-primary font-semibold tracking-wide uppercase"
            >
              THE ALPINIST COLLECTION BY US
            </span>
            <span
              class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Allumeurs d’étoiles…
            </span>
          </h1>
        </div>
        <div
          class="mt-6 prose prose-a:text-primary prose-p:text-justify prose-invert prose-lg text-white mx-auto"
        >
          <p>
            Green chef étoilé en jeans & converse, découverte romande au Gault &
            Millau en 2010 (17/20), 1ère étoile au Guide Michelin en 2015,
            <strong>Pierre</strong>, c’est le feu, la passion, l’émulation, un
            tempérament volubile, une idée à la seconde, des rêves et des envies
            plein la tête, la haute gastronomie au bout des doigts et bien
            accrochée dans son cœur. Il aime partager, faire découvrir, il aime
            vivre.
          </p>
          <p>
            Diplômée en Communication de l’Université de Lugano,
            <strong>Delphine</strong>, c’est l’air, la force tranquille, la
            vision, l’organisation, le sens esthétique, le dénominateur commun
            de toute cette aventure, c’est l’ancrage valaisan de l’histoire...
            le Mayen de sa grand-maman, la Guérite de son beau-frère et cette
            énergie, ce lien qu’elle sait créer avec l’autre en toute
            simplicité.
          </p>
          <p>
            <strong>Ensemble</strong>, ils ont fait de la Nature, de la Montagne
            leur ressource, cette énergie qui les recharge et les inspire et qui
            vibre dans chacune des 4 expériences de The Alpinist Collection.
          </p>
        </div>
      </div>
    </section>
    <section class="py-12 md:py-20 lg:py-24">
      <div class="pb-16 bg-neutral-800 lg:pb-0 lg:z-10 lg:relative">
        <div
          class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8"
        >
          <div class="relative lg:-my-8">
            <div
              aria-hidden="true"
              class="absolute inset-x-0 top-0 h-1/2 bg-neutral-900 lg:hidden"
            />
            <div
              class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full"
            >
              <div
                class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full"
              >
                <img
                  class="object-cover lg:h-full lg:w-full"
                  src="/images/pierre.jpg"
                  alt="Pierre Crepaud"
                />
              </div>
            </div>
          </div>
          <div class="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
            <div
              class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none"
            >
              <blockquote>
                <div>
                  <svg
                    class="h-12 w-12 text-primary"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path
                      d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                    />
                  </svg>
                  <p class="mt-6 text-2xl font-medium text-white">
                    Des instants de vie à collectionner sans modération
                  </p>
                  <p
                    class="mt-6 text-lg italic text-justify font-normal text-white"
                  >
                    « Ma cuisine s’inspire d’une nature aussi riche
                    qu’exigeante. Le terroir valaisan, fertile et généreux, est
                    une source d’inspiration inépuisable. Les produits de saison
                    sont soigneusement sélectionnés auprès de producteurs locaux
                    et issus d’une agriculture propre, raisonnée et naturelle.
                    Rencontrer ces producteurs de talent est une source
                    d’inspiration et d’authenticité pour créer des plats faits
                    d’alliances originales et inattendues au rythme de la
                    Nature. Soucieux de l’avenir de notre Terre et du bien-être
                    de chacun, The Alpinisit Collection propose des expériences
                    conscientes et responsables. Nos produits sont tous
                    artisanaux, pour certains bio, et respectent l’homme,
                    l’animal et le végétal. »
                  </p>
                </div>
                <footer class="mt-6">
                  <p class="text-base font-medium text-white">Pierre Crepaud</p>
                  <p class="text-base font-medium text-green-100">
                    Chef étoilé décontracté en jeans & baskets (17/20 Gault et
                    Millau / 1 étoile Michelin)
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 md:py-20 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="block text-base text-center text-primary font-semibold tracking-wide uppercase"
              >The Alpinist Collection</span
            >
            <span
              class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
              >4 expériences à vivre au cœur du Valais</span
            >
          </h1>
        </div>
        <div
          class="mt-6 prose prose-a:text-primary prose-p:text-justify prose-invert prose-lg text-white mx-auto"
        >
          <p>
            A 4 mains, ils sont les alchimistes de 4 expériences à vivre au cœur
            du Valais. C’est comme s’ils avaient réussi à encapsuler la Nature
            dans leurs projets. Une source d’inspiration inépuisable qui
            s’invite de la Guérite au Mayen, en passant par leur Épicerie Fine
            et la Cuisine Étoilée de Pierre qui s’invite chez vous à domicile.
            Des expériences à partager sans modération, à s’offrir ou à offrir
          </p>
        </div>
        <div class="mt-12 md:mt-16 lg:mt-24 text-center">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="feature in navigation" :key="feature.name" class="pt-6">
              <div
                class="flow-root group rounded-lg px-6 pb-8 transition-all hover:bg-neutral-800 hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer"
                @click="goTo(feature.to)"
              >
                <div class="-mt-6">
                  <div>
                    <span
                      class="inline-flex items-center justify-center rounded-md p-3 shadow-lg transition-colors group-hover:bg-neutral-800"
                    >
                      <component
                        :is="feature.icon"
                        class="h-6 w-6 transition-colors text-primary"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <h3
                    class="mt-8 text-lg font-medium tracking-tight text-white"
                  >
                    {{ feature.name }}
                  </h3>
                  <p class="mt-5 text-base text-white">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { navigation } from "@/const"
import { useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const goTo = (to) => router.push(to)

    return {
      navigation,
      goTo,
    }
  },
}
</script>
