<template>
  <div>
    <section>
      <AppContent class="uppercase" :text-center="true">
        <h2>« vent d'ange »</h2>
        <p class="italic">
          Aucun hiver ne dure éternellement… <br />aucun printemps ne manque à
          son arrivée
        </p>
        <p>
          <span class="italic"
            >la gastronomie décomplexée by pierre crepaud au cœur du
            vignoble.<br />
            Et si la meilleure façon de sentir pleinement la nature<br />
            était d’y goûter ?</span
          >
        </p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>huile d’olive craquante / pain au levain / fleur de sel</p>
        <p>première impression</p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>
          tarte fine croustillante<br />Langoustine / asperges de saillon /
          morilles<br />ail des ours de bex / pecorino romano
        </p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>
          Œuf bio 63° du valais<br />Spuma di risotto / guanciale / asperges
          vertes<br />pain crousti / huile d’épicéa alpin
        </p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>
          Omble chevalier des lacs suisses<br />Safran de fully / gnocchi / yuzu
          / ficoïde glaciale
        </p>

        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>Le shot complètement givré à deviner</p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>
          Cœur de filet de veau basse température<br />ravioli ricotta-roquette
          / stracciatella / Petits pois<br />pickles de moutarde / jus infusé au
          foin
        </p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>
          Brie affiné comme je l’aime<br />Ail sauvage des bois / mascarpone /
          gelée de lilas
        </p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>L’intemporel mont blanc au fil des saisons</p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p>Dernières petites touches sucrées &amp; café by xalala</p>
        <div class="not-prose">
          <sun-icon class="h-5 w-5 mx-auto text-primary" aria-hidden="true" />
        </div>
        <p class="italic lowercase">Menu: 165.- p.p (hors boissons)</p>
      </AppContent>
    </section>
  </div>
</template>

<script>
import AppContent from "@/layouts/AppContent.vue"

import { SunIcon } from "@heroicons/vue/outline"

export default {
  components: { AppContent, SunIcon },
  setup() {},
}
</script>
