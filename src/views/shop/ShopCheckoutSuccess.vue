<script setup>
import { useRoute, useRouter } from "vue-router"
import VLoading from "@/components/VLoading.vue"
import { reactive, onMounted } from "vue"
import { checkoutService } from "@/services"

const state = reactive({
  loading: true,
  data: null,
  error: false,
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const orderId = await checkoutService.verify(route.params.sessionId)
  if (!orderId) {
    state.loading = false
    state.error = true
    return
  }
  router.push({ name: "ShopOrder", params: { orderId: orderId } })
})
</script>

<template>
  <div>
    <section>
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-primary uppercase tracking-wide">
            Order Checkout
          </p>
          <h1
            class="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl"
          >
            Vérification du paiement
          </h1>
          <p class="mt-2 text-base text-neutral-300">
            Vous allez être redirigé une fois la vérification terminée
          </p>
          <div v-if="state.loading" class="my-12">
            <v-loading />
          </div>
          <p v-else-if="error" class="mt-2 text-base text-neutral-300">
            Désolé, une erreur est survenue. Veuillez nous contacter par email.
          </p>
          <div v-if="!state.loading" class="mt-6">
            <router-link
              to="/"
              class="text-base font-medium text-primary hover:text-opacity-80"
              >Retourner a l'acceuil<span aria-hidden="true">
                &rarr;</span
              ></router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
