<template>
  <div>
    <section>
      <AppContent>
        <figure>
          <img
            class="w-full oject-contain object-center rounded-lg"
            src="/images/4808/unnamed.jpg"
          />
          <figcaption>Sophie Diaz Photographie</figcaption>
        </figure>
        <p>
          En jeans et converse, chez vous, la cuisine étoilée de Pierre (17/20
          Gault et Millau, 1étoile Michelin) s’invite dans vos assiettes, tandis
          que le savoir recevoir de Delphine poudre d’étoiles vos repas entre
          amis et en famille. Profitez de vos invités, ils s’occupent de tout.
        </p>
        <figure>
          <img
            class="w-full object-contain object-center rounded-lg"
            src="/images/4808/pierre2.jpg"
          />
          <figcaption>Sophie Diaz Photographie</figcaption>
        </figure>
        <h3>Pourquoi 4808 ?</h3>
        <p>
          En référence à l’altitude de la montagne de prédilection de Pierre
          Crepaud. Le Mont Blanc. Un sommet dont le nom est aussi celui du
          dessert signature du chef étoilé depuis 2012.
        </p>
        <figure>
          <img
            class="w-full object-contain object-center rounded-lg"
            src="/images/4808/pierre3.jpg"
          />
          <figcaption>Sophie Diaz Photographie</figcaption>
        </figure>
        <h3>Pour un dîner en …</h3>
        <p>
          amoureux, une fête de famille, un mariage, un dîner entre amis, une
          rencontre professionnelle, peu importe la raison, la seule qui compte
          est celle de transformer un repas en menu étoilé. Le plaisir de voir
          le chef cuisiner pour vous et chez vous.
        </p>
        <figure>
          <img
            class="w-full object-contain object-center rounded-lg"
            src="/images/4808/pierre4.jpg"
          />
          <figcaption>Sophie Diaz Photographie</figcaption>
        </figure>
        <h3>Infos et réservation</h3>
        <p>
          Delphine & Pierre vous proposent une expérience culinaire chez vous
          dès 6 personnes. Le prix varie si le choix se fait avec ou sans les
          vins de la Cave Corbassière, à Saillon. Le prix comprend la décoration
          et la mise en place de la table, le menu (8 plats), la vaisselle et
          les couverts (hors verres), la prestation du chef et le service (à
          l’exception des vins)
        </p>
      </AppContent>
      <div class="max-w-prose mx-auto text-center pt-10">
        <router-link
          :to="{ name: '4808Booking' }"
          class="button-primary text-white not-prose"
          >Demander une offre</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import AppContent from "@/layouts/AppContent.vue"

export default {
  components: {
    AppContent,
  },
}
</script>
