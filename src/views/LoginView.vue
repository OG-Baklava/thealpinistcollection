<template>
  <div>
    <section>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          class="mt-6 text-center text-3xl tracking-tight font-bold text-white"
        >
          Connectez vous
        </h2>
        <!-- <p class="mt-2 text-center text-sm text-neutral-300">
          Ou
          {{ " " }}
          <router-link
            to="/register"
            class="font-medium text-primary hover:text-indigo-500"
          >
            créez un compte
          </router-link>
        </p> -->
        <p class="mt-2 text-center text-sm text-yellow-400">
          Création de compte bientôt disponible.
        </p>
      </div>

      <div
        class="relative max-w-lg mt-10 mx-auto p-8 rounded-lg shadow-lg bg-neutral-800"
      >
        <form @submit="onSubmit">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div class="sm:col-span-2">
              <Input identifier="email" label="Email" type="email" />
            </div>
            <div class="sm:col-span-2">
              <Input
                identifier="password"
                label="Mot de passe"
                type="password"
              />
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="w-full button-primary">
                Se connecter
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Input from "@/components/form/Input.vue"
import { useAuthUserStore } from "@/stores/auth"
import { useForm } from "vee-validate"
import { ref } from "vue"

export default {
  components: {
    Input,
  },
  setup() {
    const success = ref(false)
    const error = ref(false)
    const store = useAuthUserStore()

    const { handleSubmit } = useForm()

    const onSubmit = handleSubmit(async (values) => {
      await store.login(values)
    })

    return {
      success,
      error,
      onSubmit,
    }
  },
}
</script>
