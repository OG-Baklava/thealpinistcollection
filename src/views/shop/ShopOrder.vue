<script setup>
import VLoading from "@/components/VLoading.vue"
import { checkoutService } from "@/services"
import { useCartStore } from "@/stores/cart"
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"

const cartStore = useCartStore()

const state = reactive({
  loading: true,
  data: null,
})

const route = useRoute()

onMounted(async () => {
  state.data = await checkoutService.get(route.params.orderId)
  state.loading = false
})
</script>

<template>
  <div>
    <div v-if="state.loading" class="mx-auto">
      <v-loading />
    </div>
    <div v-else class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="max-w-xl">
        <h1 class="text-base font-medium text-primary">Merci !</h1>
        <p
          class="mt-2 text-4xl text-white font-bold tracking-tight sm:text-5xl"
        >
          It's on the way!
        </p>
        <p class="mt-2 text-base text-neutral-300">
          Votre commande
          <span class="text-primary"
            >#{{ route.params.orderId.toUpperCase() }}</span
          >
          a bien été reçue par notre équipe et sera traitée dans les plus brefs
          délais
        </p>
      </div>

      <div class="mt-10 border-t border-neutral-600">
        <div
          v-for="product in state.data.products"
          :key="product.id"
          class="flex space-x-6 border-b border-neutral-600 py-10"
        >
          <img
            :src="product.thumbUrl"
            class="h-20 w-20 flex-none rounded-lg object-cover object-center sm:h-40 sm:w-40"
          />
          <div class="flex flex-auto flex-col">
            <div>
              <h4 class="font-medium text-white hover:text-primary">
                <router-link
                  :to="{
                    name: 'ShopProduct',
                    params: { productId: product.id },
                  }"
                  >{{ product.name }}</router-link
                >
              </h4>
              <p class="mt-2 text-sm text-neutral-300">
                {{ product.shortText }}
              </p>
              <p class="text-sm text-neutral-300">
                {{ product.text }}
              </p>
            </div>
            <div class="mt-6 flex flex-1 items-end justify-end">
              <dl
                class="flex space-x-4 divide-x divide-neutral-600 text-sm sm:space-x-6"
              >
                <div class="flex">
                  <dt class="font-medium text-white">Quantité</dt>
                  <dd class="ml-2 text-neutral-300">
                    {{ product.selectedSize.qty }} {{ product.uom }}
                  </dd>
                </div>
                <div class="flex pl-4 sm:pl-6">
                  <dt class="font-medium text-white">Prix</dt>
                  <dd class="ml-2 text-neutral-300">
                    {{ product.selectedSize.price.toFixed(2) }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div class="sm:ml-40 sm:pl-6">
          <dl class="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <dt class="font-medium text-white">Adresse de livraison</dt>
              <dd class="mt-2 text-neutral-300">
                <address class="not-italic">
                  <span class="block"
                    >{{ state.data.firstname }} {{ state.data.lastname }}</span
                  >
                  <span class="block">{{ state.data.address }}</span>
                  <span class="block"
                    >{{ state.data.zip }}, {{ state.data.city }}</span
                  >
                </address>
              </dd>
            </div>
            <div>
              <dt class="font-medium text-white">Méthode de livraison</dt>
              <dd class="mt-2 text-neutral-300">
                <p>Poste</p>
                <p>Peut prendre jusqu'a 7 jours</p>
              </dd>
            </div>
          </dl>

          <dl class="space-y-6 border-t border-neutral-600 pt-10 text-sm">
            <div class="flex justify-between">
              <dt class="font-medium text-white">Sous-total</dt>
              <dd class="text-neutral-300">
                CHF {{ (state.data.amount - cartStore.shippingFee).toFixed(2) }}
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="font-medium text-white">Livraison</dt>
              <dd class="text-neutral-300">
                CHF {{ state.data.shippingFee.toFixed(2) }}
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="font-medium text-white">Total</dt>
              <dd class="text-primary">
                CHF {{ state.data.amount.toFixed(2) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
