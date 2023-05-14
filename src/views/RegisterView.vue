<template>
  <div>
    <section>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          class="mt-6 text-center text-3xl tracking-tight font-bold text-white"
        >
          Créez un compte
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-300">
          Vous en possédez déjà un ?
          {{ " " }}
          <router-link
            to="/login"
            class="font-medium text-primary hover:text-indigo-500"
          >
            connectez-vous
          </router-link>
        </p>
      </div>
      <div
        class="relative max-w-lg mt-10 mx-auto p-8 rounded-lg shadow-lg bg-neutral-800"
      >
        <form @submit="onSubmit">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <Input identifier="firstname" label="Nom" type="text" />
            </div>
            <div>
              <Input identifier="lastname" label="Prénom" type="text" />
            </div>
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
              <Input
                identifier="passwordVerif"
                label="Confirmation mot de passe"
                type="password"
              />
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="w-full button-primary">
                S'enregister
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
import { useForm } from "vee-validate"
import { ref } from "vue"
import { useAuthUserStore } from "@/stores/auth"

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
      await store.register({
        name: `${values.lastname} ${values.firstname}`,
        email: values.email,
        password: values.password,
      })
    })

    return {
      success,
      error,
      onSubmit,
    }
  },
}
</script>
