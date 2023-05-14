<script setup>
import VBreadcrumbs from "@/components/VBreadcrumbs.vue"
import LayoutContainer from "@/layouts/LayoutContainer.vue"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const selectedTab = ref(route.name)

const onTabClick = () => {
  router.push({ name: selectedTab.value })
}

const breads = [
  {
    name: "Epicerie 2018",
    to: { name: "Epicerie2018" },
  },
  {
    name: "Shop",
    to: { name: "ShopIndex" },
  },
]

const tabs = [
  { name: "Tous", to: { name: "ShopIndex" } },
  { name: "Sucré", to: { name: "ShopSweet" } },
  { name: "Salé", to: { name: "ShopDirty" } },
  { name: "Liqueurs", to: { name: "ShopLiquors" } },
]
</script>

<template>
  <div>
    <LayoutContainer>
      <VBreadcrumbs :breads="breads" return-link="Epicerie2018" />

      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
          >
            L'épicerie 2018 en ligne
          </h2>
        </div>
      </div>
      <div class="pb-5 border-b border-neutral-600 sm:pb-0 pt-4 sm:pt-8">
        <div>
          <div class="sm:hidden">
            <select
              id="current-tab"
              v-model="selectedTab"
              name="current-tab"
              class="block w-full pl-3 pr-10 py-2 text-base text-white border-neutral-600 bg-neutral-800 focus:outline-none sm:text-sm rounded-md"
              @change="onTabClick"
            >
              <option v-for="tab in tabs" :key="tab.name" :value="tab.to.name">
                {{ tab.name }}
              </option>
            </select>
          </div>
          <div class="hidden sm:block">
            <nav class="-mb-px flex space-x-8">
              <router-link
                v-for="tab in tabs"
                :key="tab.name"
                :to="tab.to"
                exact-active-class="!border-primary !text-primary"
                class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm border-transparent transition-all hover:cursor-pointer text-white hover:text-primary hover:border-primary"
              >
                {{ tab.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </LayoutContainer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
