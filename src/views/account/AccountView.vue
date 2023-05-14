<template>
  <div>
    <LayoutContainer>
      <div class="flex justify-between mt-6">
        <h2
          class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
        >
          Bienvenue
        </h2>
        <button class="button-primary-small" @click="logout()">
          Se déconnecter
        </button>
      </div>

      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 mt-10">
        <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="space-y-1">
            <router-link
              v-for="item in subNavigation"
              :key="item.name"
              :to="item.href"
              exact-active-class="!bg-neutral-800 !text-primary"
              class="group rounded-md px-3 py-2 flex items-center text-sm font-medium text-white hover:text-primary hover:bg-neutral-800"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-primary'
                    : 'text-neutral-300 group-hover:text-primary',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              <span class="truncate">
                {{ item.name }}
              </span>
            </router-link>
          </nav>
        </aside>

        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <VTransitionFade>
              <Suspense>
                <component
                  :is="Component"
                  class="sm:px-6 lg:px-0 lg:col-span-9"
                />
                <template #fallback
                  ><div class="sm:px-6 lg:px-0 lg:col-span-9 py-10">
                    <VLoading />
                  </div>
                </template>
              </Suspense>
            </VTransitionFade>
          </template>
        </router-view>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup>
import LayoutContainer from "@/layouts/LayoutContainer.vue"
import VTransitionFade from "@/components/VTransitionFade.vue"
import { CreditCardIcon, KeyIcon, UserCircleIcon } from "@heroicons/vue/outline"
import { useAuthUserStore } from "@/stores/auth"
import VLoading from "@/components/VLoading.vue"

const store = useAuthUserStore()

const subNavigation = [
  {
    name: "Profile",
    href: { name: "AccountIndex" },
    icon: UserCircleIcon,
  },
  // {
  //   name: "Mot de passe",
  //   href: { name: "AccountSecurity" },
  //   icon: KeyIcon,
  // },
  // {
  //   name: "Historique des commandes",
  //   href: { name: "AccountOrderHistory" },
  //   icon: CreditCardIcon,
  // },
]

const logout = async () => await store.logout()
</script>
