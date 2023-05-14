<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const selectedTab = ref(route.name)

const props = defineProps({
  tabs: Array,
  isAlt: {
    type: Boolean,
    default: false,
  },
})
const onTabClick = () => {
  router.push({ name: selectedTab.value })
}
</script>

<template>
  <div
    :class="{
      'pb-5 border-b border-neutral-600 sm:pb-0 pt-4 sm:pt-8': !props.isAlt,
    }"
  >
    <div>
      <div v-if="!props.isAlt" class="sm:hidden">
        <select
          id="current-tab"
          v-model="selectedTab"
          name="current-tab"
          class="block w-full pl-3 pr-10 py-2 text-base text-white border-neutral-600 bg-neutral-800 focus:outline-none sm:text-sm rounded-md"
          @change="onTabClick"
        >
          <option
            v-for="tab in props.tabs"
            :key="tab.name"
            :value="tab.to.name"
          >
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div :class="{ 'hidden sm:block': !props.isAlt }">
        <nav
          :class="[
            'flex',
            props.isAlt ? 'space-x-4 justify-center' : '-mb-px space-x-8',
          ]"
        >
          <router-link
            v-for="tab in props.tabs"
            :key="tab.name"
            :to="tab.to"
            :exact-active-class="
              props.isAlt
                ? '!bg-primary !bg-opacity-80'
                : '!border-primary !text-primary'
            "
            :class="[
              'font-medium text-sm transition-all hover:cursor-pointer text-white',
              props.isAlt
                ? 'px-4 py-3 rounded-md hover:bg-primary hover:bg-opacity-80'
                : 'whitespace-nowrap pb-4 px-1 border-b-2 border-transparent hover:border-primary hover:text-primary',
            ]"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>
