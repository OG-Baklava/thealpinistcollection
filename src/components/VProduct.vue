<script setup>
import VLoading from "@/components/VLoading.vue"
import VTransitionFade from "./VTransitionFade.vue"

const props = defineProps({
  data: Array,
})
</script>

<template>
  <VTransitionFade>
    <div
      v-if="props.data"
      class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4"
    >
      <router-link
        v-for="product in props.data"
        :key="product.id"
        :to="{ name: 'ShopProduct', params: { productId: product.id } }"
        class="relative group"
      >
        <div
          class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100"
        >
          <img
            :src="product.data.thumbUrl"
            class="object-center object-cover"
          />
          <div
            class="flex items-end opacity-0 p-4 group-hover:opacity-100"
            aria-hidden="true"
          >
            <div
              class="w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center"
            >
              Voir le produit
            </div>
          </div>
        </div>
        <div
          class="mt-4 flex items-center justify-between text-base font-medium text-white space-x-2"
        >
          <h3 class="line-clamp-1">
            {{ product.data.name }}
          </h3>
          <p class="flex-shrink-0">
            CHF {{ product.data.quants[0].price.toFixed(2) }}
          </p>
        </div>
        <p class="mt-1 text-sm text-neutral-300">
          {{ product.data.shortText }}
        </p>
      </router-link>
    </div>
    <div v-else>
      <div class="py-24 mx-auto">
        <VLoading />
      </div>
    </div>
  </VTransitionFade>
</template>
