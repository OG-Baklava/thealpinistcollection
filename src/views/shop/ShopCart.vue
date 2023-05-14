<script setup>
import LayoutContainer from "@/layouts/LayoutContainer.vue"
import { useCartStore } from "@/stores/cart"
import WarningAlert from "@/components/alerts/Warning.vue"

const cartStore = useCartStore()
</script>

<template>
  <div>
    <LayoutContainer>
      <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1
          class="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Votre panier
        </h1>

        <div v-if="cartStore.products.length" class="mt-12">
          <ul
            role="list"
            class="divide-y divide-neutral-600 border-t border-b border-neutral-600"
          >
            <li
              v-for="product in cartStore.products"
              :key="product"
              class="flex py-6"
            >
              <div class="flex-shrink-0">
                <img
                  :src="product.thumbUrl"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <router-link
                        class="font-medium text-white hover:text-primary"
                        :to="{
                          name: 'ShopProduct',
                          params: { productId: product.id },
                        }"
                        >{{ product.name }}</router-link
                      >
                    </h4>
                    <p class="ml-4 text-sm font-medium text-white">
                      CHF {{ product.selectedSize.price.toFixed(2) }}
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-neutral-300">
                    {{ product.selectedSize.qty }} {{ product.uom }}
                  </p>
                  <p class="mt-1 text-sm text-neutral-300">
                    {{ product.text }}
                  </p>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-end">
                  <!-- <p class="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckIcon
                      v-if="product.inStock"
                      class="h-5 w-5 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                    <ClockIcon
                      v-else
                      class="h-5 w-5 flex-shrink-0 text-gray-300"
                      aria-hidden="true"
                    />
                    <span>{{
                      product.inStock
                        ? "In stock"
                        : `Will ship in ${product.leadTime}`
                    }}</span>
                  </p> -->
                  <div class="ml-4">
                    <button
                      type="button"
                      class="text-sm font-medium text-primary hover:text-opacity-80"
                      @click="cartStore.rmProduct(product.id)"
                    >
                      <span>supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Order summary -->
        <div
          v-if="cartStore.products.length"
          aria-labelledby="summary-heading"
          class="mt-10"
        >
          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-white">Sous-total</dt>
                <dd class="ml-4 text-base font-medium text-white">
                  CHF {{ cartStore.total.toFixed(2) }}
                </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-neutral-300">
              Les frais d'expédition seront ajoutés à la confirmation de la
              commande.
            </p>
          </div>

          <div class="mt-10">
            <router-link to="/checkout" class="button-primary w-full">
              Confirmer la commande
            </router-link>
          </div>

          <div class="mt-6 text-center text-sm">
            <p>
              <router-link
                to="/shop"
                class="font-medium text-primary hover:text-opacity-80"
              >
                Continuez vos achats
                <span aria-hidden="true"> &rarr;</span>
              </router-link>
            </p>
          </div>
        </div>
        <div v-else class="mt-10 flex flex-col items-center">
          <warning-alert
            text="Rendez vous dans le shop et ajoutez un ou plusieurs produits au panier pour pouvoir compléter une commande."
            title="Le panier est vide"
          />
          <div class="mt-10">
            <router-link to="/shop" class="button-primary">
              Parcourir le shop
            </router-link>
          </div>
        </div>
      </div>
    </LayoutContainer>
  </div>
</template>
