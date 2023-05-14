<script setup>
import VAddProduct from "@/components/VAddProduct.vue"
import VBreadcrumbs from "@/components/VBreadcrumbs.vue"
import { productService } from "@/services"
import { useAuthUserStore } from "@/stores/auth"
import { useCartStore } from "@/stores/cart"
import { useNotificationStore } from "@/stores/notifications"
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue"
import { BanIcon, CheckIcon } from "@heroicons/vue/solid"
import { onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const notificationsStore = useNotificationStore()
const cartStore = useCartStore()
const userStore = useAuthUserStore()

const breadcrumbs = [
  { id: 1, name: "Epicerie 2018", to: { name: "Epicerie2018" } },
  { id: 2, name: "Shop", to: { name: "ShopIndex" } },
]
const selectedSize = ref()
const router = useRouter()
const route = useRoute()
const state = reactive({
  loading: true,
  data: null,
})

const addToCart = () => {
  cartStore.addProduct({
    ...state.data,
    selectedSize: selectedSize.value,
    id: route.params.productId,
  })
  notificationsStore.add({
    title: "Succès",
    text: "Le produit à été ajouté au panier",
    type: "success",
  })
}

const deleteProduct = async () => {
  await productService.delete(route.params.productId)
  router.push({ name: "AdminProducts" })
}

onMounted(async () => {
  state.data = await productService.get(route.params.productId)
  selectedSize.value = state.data.quants[0]
  state.loading = false
})
</script>

<template>
  <div>
    <section>
      <div v-if="!state.loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <!-- Product details -->
          <div class="lg:max-w-lg lg:self-end">
            <VBreadcrumbs
              :breads="
                userStore.isAdmin
                  ? [
                      {
                        id: 1,
                        name: 'Admin produits',
                        to: { name: 'AdminProducts' },
                      },
                    ]
                  : breadcrumbs
              "
              return-link="ShopIndex"
            />

            <div class="mt-4">
              <h1
                class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                {{ state.data.name }}
              </h1>
            </div>

            <div aria-labelledby="information-heading" class="mt-4">
              <div class="flex items-center">
                <p class="text-lg text-white sm:text-xl">
                  CHF {{ selectedSize.price.toFixed(2) }}
                  <template v-if="state.data.quants.length == 1">
                    | {{ selectedSize.qty }}{{ " "
                    }}{{ state.data.uom }}</template
                  >
                </p>
              </div>

              <div class="mt-4 space-y-6">
                <p class="text-base text-neutral-300">
                  {{ state.data.text }}
                </p>
              </div>
              <template v-if="!userStore.isAdmin">
                <div v-if="state.data.available" class="mt-6 flex items-center">
                  <CheckIcon
                    class="flex-shrink-0 w-5 h-5 text-green-500"
                    aria-hidden="true"
                  />
                  <p class="ml-2 text-sm text-neutral-300">
                    En stock et prêt à être envoyé
                  </p>
                </div>
                <div v-else class="mt-6 flex items-center">
                  <BanIcon
                    class="flex-shrink-0 w-5 h-5 text-red-500"
                    aria-hidden="true"
                  />
                  <p class="ml-2 text-sm text-neutral-300">Rupture de stock</p>
                </div>
              </template>
            </div>
          </div>

          <!-- Product image -->
          <div
            class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center"
          >
            <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                :src="state.data.coverUrl"
                class="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          <!-- Product form -->
          <div
            class="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start"
          >
            <div aria-labelledby="options-heading">
              <div>
                <div
                  v-if="state.data.quants.length > 1"
                  class="sm:flex sm:justify-between"
                >
                  <!-- Size selector -->
                  <RadioGroup v-model="selectedSize">
                    <RadioGroupLabel
                      class="block text-sm font-medium text-white"
                    >
                      Size
                    </RadioGroupLabel>
                    <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <RadioGroupOption
                        v-for="size in state.data.quants"
                        :key="size.qty"
                        v-slot="{ active, checked }"
                        as="template"
                        :value="size"
                      >
                        <div
                          class="relative block border border-neutral-600 rounded-lg p-4 cursor-pointer focus:outline-none"
                        >
                          <RadioGroupLabel
                            as="p"
                            class="text-base font-medium text-white"
                          >
                            {{ size.qty }}{{ " " }}{{ state.data.uom }}
                          </RadioGroupLabel>
                          <RadioGroupDescription
                            as="p"
                            class="mt-1 text-sm text-neutral-300"
                          >
                            {{ size.text }}
                          </RadioGroupDescription>
                          <div
                            :class="[
                              active ? 'border' : 'border-2',
                              checked ? 'border-primary' : 'border-transparent',
                              'absolute -inset-px rounded-lg pointer-events-none',
                            ]"
                            aria-hidden="true"
                          />
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>

                <div v-if="!userStore.isAdmin" class="mt-10">
                  <button
                    type="submit"
                    class="button-primary w-full"
                    :disabled="!state.data.available"
                    @click="addToCart"
                  >
                    Ajouter au panier
                  </button>
                </div>
                <div v-else class="mt-10">
                  <button
                    type="submit"
                    class="button-primary w-full"
                    @click="deleteProduct()"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="userStore.isAdmin">
          <section>
            <VAddProduct
              :initial-data="state.data"
              :update="true"
              :product-id="route.params.productId"
            />
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
