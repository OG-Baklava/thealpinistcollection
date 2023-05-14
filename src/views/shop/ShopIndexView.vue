<script setup>
import VProduct from "@/components/VProduct.vue"
import { collection } from "firebase/firestore"
import { useCollection, useFirestore } from "vuefire"

const db = useFirestore()
const products = useCollection(
  collection(db, "products").withConverter({
    fromFirestore: (snapshot) => {
      return { id: snapshot.id, data: snapshot.data() }
    },
    toFirestore: (product) => product,
  })
)
</script>

<template>
  <div><VProduct :data="products" /></div>
</template>
