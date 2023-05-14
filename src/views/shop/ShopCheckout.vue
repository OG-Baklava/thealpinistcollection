<script setup>
import WarningAlert from "@/components/alerts/Warning.vue"
import VInput from "@/components/form/Input.vue"
import VSpin from "@/components/VSpin.vue"
import { checkoutService } from "@/services"
import { useCartStore } from "@/stores/cart"
import { TrashIcon } from "@heroicons/vue/solid"
import { loadStripe } from "@stripe/stripe-js"
import { useForm } from "vee-validate"
import { reactive } from "vue"

const cartStore = useCartStore()
const { handleSubmit, meta } = useForm()
const state = reactive({
  error: false,
  success: false,
  loading: false,
})
const onSubmit = handleSubmit(async (values) => {
  state.loading = true
  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SHOP)
    const data = {
      amount: cartStore.totalAmount,
      shippingFee: cartStore.shippingFee,
      products: cartStore.products,
      ...values,
    }
    const sessionId = await checkoutService.create(data)
    await stripe.redirectToCheckout({
      sessionId: sessionId,
    })
  } catch (error) {
    state.error = true
    state.loading = false
  }
})
</script>

<template>
  <div>
    <div
      class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <form
        class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        @submit="onSubmit"
      >
        <div>
          <div>
            <h2 class="text-xl font-medium text-white">Contact</h2>

            <div class="mt-4">
              <VInput identifier="email" label="Email" type="email" />
            </div>
          </div>

          <div class="mt-10 border-t border-neutral-600 pt-10">
            <h2 class="text-xl font-medium text-white">Livraison</h2>

            <div
              class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
            >
              <div>
                <VInput identifier="firstname" label="Prénom" type="text" />
              </div>

              <div>
                <VInput identifier="lastname" label="Nom" type="text" />
              </div>

              <div class="sm:col-span-2">
                <VInput
                  identifier="address"
                  label="Adresse"
                  type="text"
                  placeholder="Rue des Raccrd 4"
                />
              </div>

              <div>
                <VInput identifier="city" label="Localité" type="text" />
              </div>

              <div>
                <VInput identifier="zip" label="Code postal" type="text" />
              </div>

              <div class="sm:col-span-2">
                <VInput
                  identifier="phone"
                  label="Numéro de téléphone"
                  type="text"
                  placeholder="+41 00 000 00 00"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-xl font-medium text-white">Résumé de la commande</h2>

          <div
            v-if="cartStore.allowCheckout"
            class="mt-4 rounded-lg bg-neutral-800 shadow-xl"
          >
            <ul role="list" class="divide-y divide-neutral-600">
              <li
                v-for="product in cartStore.products"
                :key="product"
                class="flex py-6 px-4 sm:px-6"
              >
                <div class="flex-shrink-0">
                  <img :src="product.thumbUrl" class="w-20 rounded-md" />
                </div>

                <div class="ml-6 flex flex-1 flex-col">
                  <div class="flex">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <router-link
                          :to="{
                            name: 'ShopProduct',
                            params: { productId: product.id },
                          }"
                          class="font-medium text-white hover:text-primary"
                          >{{ product.name }}</router-link
                        >
                      </h4>
                      <p class="mt-1 text-sm text-white">
                        {{ product.selectedSize.qty }} {{ product.uom }}
                      </p>
                      <p class="mt-1 text-sm text-neutral-300 line-clamp-2">
                        {{ product.text }}
                      </p>
                    </div>

                    <div class="ml-4 flow-root flex-shrink-0">
                      <button
                        type="button"
                        class="-m-2.5 flex items-center justify-center p-2.5 text-primary hover:text-opacity-80"
                        @click="cartStore.rmProduct(product.id)"
                      >
                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-1 items-end justify-end pt-2">
                    <p class="mt-1 text-sm font-medium text-white">
                      CHF {{ product.selectedSize.price.toFixed(2) }}
                    </p>

                    <!-- <div class="ml-4">
                      <label for="quantity" class="sr-only">Quantity</label>
                      <select
                        id="quantity"
                        name="quantity"
                        class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div> -->
                  </div>
                </div>
              </li>
            </ul>
            <dl
              class="space-y-6 border-t text-white border-neutral-600 py-6 px-4 sm:px-6"
            >
              <div class="flex items-center justify-between">
                <dt class="text-sm text-neutral-300">Sous-total</dt>
                <dd class="text-sm font-medium">
                  CHF {{ cartStore.total.toFixed(2) }}
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm text-neutral-300">Frais de livraison</dt>
                <dd class="text-sm font-medium">
                  CHF {{ cartStore.shippingFee.toFixed(2) }}
                </dd>
              </div>
              <!-- <div class="flex items-center justify-between">
                <dt class="text-sm text-neutral-300">Taxes</dt>
                <dd class="text-sm font-medium">CHF 5.52</dd>
              </div> -->
              <div
                class="flex items-center justify-between border-t border-neutral-600 pt-6"
              >
                <dt class="text-base font-medium text-neutral-300">Total</dt>
                <dd class="text-base font-medium">
                  CHF {{ cartStore.totalAmount.toFixed(2) }}
                </dd>
              </div>
            </dl>

            <div class="border-t border-neutral-600 py-6 px-4 sm:px-6">
              <button
                type="submit"
                class="w-full button-primary"
                :disabled="!meta.valid"
              >
                <template v-if="state.loading">
                  <v-spin />
                </template>
                <template v-else>Continuer vers le paiement</template>
              </button>
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
      </form>
    </div>
  </div>
</template>
