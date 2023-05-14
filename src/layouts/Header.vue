<template>
  <div class="relative">
    <VTransitionFade>
      <div v-if="isHome">
        <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
          <img
            src="/images/home.jpg"
            alt
            class="w-full h-full object-center object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-gray-900 opacity-50"
        />
      </div>
    </VTransitionFade>

    <header class="relative">
      <Popover>
        <div
          :class="[
            isHome ? 'backdrop-blur-md backdrop-filter bg-opacity-10' : '',
          ]"
        >
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="h-20 flex items-center justify-between">
              <!-- Logo (lg+) -->
              <div class="hidden lg:flex-1 lg:flex lg:items-center">
                <router-link to="/">
                  <img class="h-10 w-auto" src="/images/logo.png" />
                </router-link>
              </div>

              <div class="hidden h-full lg:flex">
                <!-- Flyout menus -->
                <div class="h-full flex justify-center space-x-8">
                  <router-link
                    v-for="page in navigation"
                    :key="page.name"
                    :to="page.to"
                    active-class="!text-primary"
                    class="flex items-center text-sm font-medium transition-colors text-white hover:text-primary"
                    >{{ page.name }}</router-link
                  >
                </div>
              </div>

              <!-- Mobile menu and search (lg-) -->
              <div class="flex-1 flex items-center lg:hidden">
                <PopoverButton class="-ml-2 bg-dark p-2 rounded-md text-white">
                  <MenuIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>

                <!-- Search -->
                <!-- <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <SearchIcon class="w-6 h-6" aria-hidden="true" />
                </a>-->
              </div>

              <!-- Logo (lg-) -->
              <router-link to="/" class="lg:hidden">
                <img src="/images/logo.png" alt class="h-8 w-auto" />
              </router-link>

              <div class="flex-1 flex items-center justify-end">
                <!-- <a
                  href="#"
                  class="
                    hidden
                    text-sm
                    font-medium
                    text-gray-700
                    hover:text-gray-800
                    lg:block
                  "
                >
                  Search
                </a>-->

                <div class="flex items-center lg:ml-8">
                  <!-- Help -->
                  <router-link
                    :to="
                      store.$state.user == null
                        ? '/login'
                        : store.$state.isAdmin
                        ? '/admin'
                        : '/account'
                    "
                    class="p-2 text-white transition-colors hover:text-primary"
                  >
                    <UserIcon class="w-6 h-6" aria-hidden="true" />
                  </router-link>
                  <!-- <router-link
                    to="/contact"
                    class="p-2 transition-colors text-white hover:text-primary lg:hidden"
                  >
                    <QuestionMarkCircleIcon
                      class="w-6 h-6"
                      aria-hidden="true"
                    />
                  </router-link>
                  <router-link
                    to="/contact"
                    class="hidden text-sm font-medium transition-colors text-white hover:text-primary lg:block"
                    >Aide</router-link
                  > -->
                  <router-link
                    v-if="cartStore.products.length == 0"
                    to="/shop"
                    class="p-2 ml-4 transition-colors text-white hover:text-primary"
                  >
                    <ShoppingBagIcon class="h-6 w-6" aria-hidden="true" />
                  </router-link>
                  <Popover v-else class="ml-4 flow-root text-sm lg:relative">
                    <PopoverButton class="group -m-2 p-2 flex items-center">
                      <ShoppingBagIcon
                        class="flex-shrink-0 h-6 w-6 transition-colors text-white group-hover:text-primary"
                        aria-hidden="true"
                      />
                      <span
                        class="ml-2 text-sm font-medium transition-colors text-white group-hover:text-primary"
                        >{{ cartStore.products.length }}</span
                      >
                    </PopoverButton>
                    <transition
                      enter-active-class="transition ease-out duration-200"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-active-class="transition ease-in duration-150"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <PopoverPanel
                        class="absolute z-50 top-16 inset-x-0 mt-px pb-6 bg-neutral-800 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
                      >
                        <h2 class="sr-only">Shopping Cart</h2>

                        <form class="max-w-2xl mx-auto px-4">
                          <div class="divide-y divide-primary">
                            <router-link
                              v-for="product in cartStore.products"
                              :key="product"
                              class="py-6 flex items-center group"
                              :to="{
                                name: 'ShopProduct',
                                params: { productId: product.id },
                              }"
                            >
                              <img
                                :src="product.thumbUrl"
                                class="flex-none w-16 h-16 rounded-md"
                              />
                              <div class="ml-4 flex-auto">
                                <h3
                                  class="font-medium text-white group-hover:text-primary"
                                >
                                  <a>{{ product.name }}</a>
                                </h3>
                                <p class="text-neutral-300">
                                  {{ product.shortText }}
                                </p>
                              </div>
                            </router-link>
                          </div>

                          <router-link
                            to="/checkout"
                            class="w-full button-primary-small"
                            :disabled="!cartStore.allowCheckout"
                          >
                            Checkout
                          </router-link>

                          <p class="mt-6 text-center">
                            <router-link
                              to="/cart"
                              class="text-sm font-medium text-primary hover:underline"
                              >Voir le panier</router-link
                            >
                          </p>
                        </form>
                      </PopoverPanel>
                    </transition>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- mobile -->
        <transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <PopoverPanel
            v-slot="{ close }"
            focus
            class="absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-left lg:hidden"
          >
            <div
              class="rounded-lg max-w-md shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-900 divide-y-2 divide-neutral-800"
            >
              <div class="pt-5 pb-6 px-5">
                <div class="flex items-center justify-between">
                  <div class="mr-2">
                    <PopoverButton
                      class="bg-neutral-900 rounded-md p-2 inline-flex items-center justify-center transition-all text-white hover:text-gray-300 hover:bg-neutral-800 focus:outline-none"
                    >
                      <span class="sr-only">Close menu</span>
                      <XIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                  <!-- <div>
                    <img class="h-8 w-auto" src="/favicon.ico" />
                  </div> -->
                </div>
                <div class="mt-6">
                  <nav class="grid gap-y-8">
                    <router-link
                      v-for="item in navigation"
                      :key="item.name"
                      v-slot="{ href, navigate }"
                      :to="item.to"
                      custom
                    >
                      <a
                        :href="href"
                        class="-m-3 p-3 flex items-center rounded-md transition-all hover:bg-neutral-800 hover:text-primary"
                        @click.prevent="navigate(), close()"
                      >
                        <component
                          :is="item.icon"
                          class="flex-shrink-0 h-6 w-6 text-primary"
                          aria-hidden="true"
                        />
                        <span class="ml-3 text-base font-medium text-white">{{
                          item.name
                        }}</span>
                      </a>
                    </router-link>
                  </nav>
                </div>
              </div>
              <!-- <div class="py-6 px-5 space-y-6">
                <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                  <router-link
                    to="/contact"
                    class="text-base font-medium text-white hover:text-gray-300"
                  >News</router-link>

                  <router-link
                    to="/team"
                    class="text-base font-medium text-white hover:text-gray-300"
                  >Equipe</router-link>
                </div>
                <div v-if="isAuth" class="flex gap-4">
                  <router-link
                    :to="user.isAdmin ? '/news/admin' : '/portal'"
                    class="w-full button-primary"
                  >Mon compte</router-link>
                  <a
                    @click="logout()"
                    class="w-full flex items-center justify-center px-4 py-2 transition-all border border-neutral-800 rounded-md shadow-sm text-base font-medium text-white bg-transparent hover:bg-neutral-800 hover:cursor-pointer"
                  >Se déconnecter</a>
                </div>
                <a
                  v-else
                  href="https://opennet15.odoocloud.ch/web/login"
                  target="_blank"
                  class="w-full button-primary"
                >Se connecter</a>
              </div>-->
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </header>

    <VTransitionFade>
      <div
        v-if="isHome"
        class="relative max-w-4xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0"
      >
        <h1
          class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl"
        >
          Quand la cuisine crée du sens
        </h1>
        <p class="mt-4 text-xl text-white">
          Du mayen à la Guérite, chez vous ou à travers leurs produits, Pierre
          et Delphine vous emmènent un peu plus près des étoiles... Celles des
          montagnes qui tutoient les sommets pas de hasard si leur univers
          s'appelle The Alpinist Collection.
        </p>
      </div>
    </VTransitionFade>
  </div>
</template>

<script>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import {
  MenuIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
  PhotographIcon,
  LockClosedIcon,
  HomeIcon,
} from "@heroicons/vue/outline"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { useAuthUserStore } from "@/stores/auth"
import { useCartStore } from "@/stores/cart"
import { navigation } from "@/const"
import VTransitionFade from "@/components/VTransitionFade.vue"

export default {
  components: {
    MenuIcon,
    ShoppingBagIcon,
    UserIcon,
    XIcon,
    PhotographIcon,
    LockClosedIcon,
    HomeIcon,
    Popover,
    PopoverButton,
    PopoverPanel,
    VTransitionFade,
  },
  setup() {
    const open = ref(false)
    const route = useRoute()
    const isHome = ref(route.name == "Home")
    const store = useAuthUserStore()
    const cartStore = useCartStore()

    watch(
      () => route.name,
      (newName) => {
        isHome.value = newName == "Home"
      }
    )

    return {
      navigation,
      open,
      isHome,
      cartStore,
      store,
    }
  },
}
</script>
