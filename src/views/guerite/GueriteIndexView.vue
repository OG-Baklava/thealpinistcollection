<script setup>
import AppContent from "@/layouts/AppContent.vue"
</script>

<template>
  <div>
    <section>
      <div class="max-w-2xl mx-auto lg:max-w-7xl">
        <div
          class="grid items-center grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2"
        >
          <div
            class="mt-6 prose prose-a:text-primary prose-p:text-justify prose-invert prose-lg text-white mx-auto"
          >
            <p>
              Au milieu du vignoble de la Cave Corbassière de Nicolas Cheseaux à
              Saillon. Un endroit où on sent la terre vivre et la vigne grandir.
              De mai à octobre, un menu unique « VENT D’ANGE » avec comme fil
              rouge, le produit de saison, celui qui pousse dans les mêmes
              terres que celle du vignoble qui vous entoure. Des accords mets et
              vins qui conjuguent la cuisine étoilée sans artifices de Pierre
              Crepaud (17/20 Gault et Millau, 1étoile Michelin), les vins
              authentiques de Nicolas Cheseaux de la Cave Corbassière et la
              spontanéité conviviale de Delphine. Ce lieu, Pierre l’a découvert
              par hasard, lors d’une marche avec Delphine. Quand il l’a vu, il a
              dit, « je rêverais d’emmener ma cuisine ici » et Delphine de lui
              répondre… « ton rêve est une réalité, cette guérite c’est celle de
              mon beau-frère ». Un hasard ? Ni Delphine, ni Pierre y croient. Le
              destin. C’est certain !
            </p>

            <p>
              Comme toujours avec Pierre & Delphine, l’expérience commence avant
              votre arrivée à la Guérite. Par une montée à pied (15 minutes de
              marche) depuis le village de Saillon, accompagné par Nicolas
              Cheseaux, à travers son vignoble, celui de la Cave Corbassière. Le
              temps de déconnecter et de vous reconnecter à l’énergie de ce lieu
              hors du temps et de déguster quelques spécialités du domaine en
              chemin et oui c’est le Valais, le plaisir du bon vivre. Une petite
              heure pour arriver à la Guérite et surplomber Sailllon, le plus
              beau village de Suisse romande consacré en 2013.
            </p>
          </div>

          <div>
            <div
              class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden"
            >
              <img
                src="/images/guerite/guerite4.jpg"
                class="w-full h-full object-center object-cover"
              />
            </div>
            <div
              class="grid grid-cols-2 gap-4 mt-4 sm:gap-6 sm:mt-6 lg:gap-8 lg:mt-8"
            >
              <div
                class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden"
              >
                <img
                  src="/images/guerite/guerite2.jpg"
                  class="w-full h-full object-center object-cover"
                />
              </div>
              <div
                class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden"
              >
                <img
                  src="/images/guerite/guerite3.jpg"
                  class="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            <p class="text-base text-neutral-300 mt-2">
              Sophie Diaz Photographie
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <AppContent>
        <h3>Pourquoi 1814 ?</h3>
        <p>
          C’est le numéro de la parcelle de la Guérite. Une question de plan, de
          carte, de topographie. Un petit sommet, moins haut que le Mont-Blanc,
          mais un petit sommet quand même en haut d’un vignoble.
        </p>
        <figure>
          <img
            class="w-full object-scale-down rounded-lg"
            src="/images/guerite/guerite1.jpg"
          />
          <figcaption>Sophie Diaz Photographie</figcaption>
        </figure>
        <h3>Une guérite ?</h3>
        <p>
          Si vous êtes valaisan.e.s vous savez, si vous allez souvent en Valais,
          vous les re.connaissez. Les guérites c’est le Valais, comme le vin
          d’ailleurs. Ces bâtisses modestes et fonctionnelles servaient aux
          viticulteurs à s’abriter, à ranger des outils et parfois à y passer la
          nuit. Une cabane dans les vignes, avec comme décor les ceps qui
          l’entourent et la plaine du Rhône à vos pieds. Une cabane dans les
          vignes où déguster un menu étoilé…Magique, éphémère, unique,
          authentique. C’est ça l’esprit de la Guérite 1814.
        </p>
      </AppContent>
      <div class="max-w-prose mx-auto text-center pt-10">
        <router-link to="/guerite1814/booking" class="button-primary"
          >Réservez dès maintenant</router-link
        >
      </div>
    </section>
  </div>
</template>
