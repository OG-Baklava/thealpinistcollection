<script setup>
import VGueriteMenu from "@/components/VGueriteMenu.vue"
import VLoading from "@/components/VLoading.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import { collection, doc } from "firebase/firestore"
import { useDocument, useFirestore } from "vuefire"

const db = useFirestore()

const { pending: pendingSettings, data: settings } = useDocument(
  doc(collection(db, "bookSettings"), "guerite")
)
</script>

<template>
  <div>
    <section>
      <VTransitionFade>
        <div v-if="pendingSettings">
          <VLoading />
        </div>
        <div v-else>
          <VGueriteMenu :menu="settings.menu" />
        </div>
      </VTransitionFade>
    </section>
  </div>
</template>
