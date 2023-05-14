<script setup>
import VSpin from "@/components/VSpin.vue"
import ErrorAlert from "@/components/alerts/Error.vue"
import SuccessAlert from "@/components/alerts/Success.vue"
import Input from "@/components/form/Input.vue"
import Textarea from "@/components/form/Textarea.vue"
import { contactService } from "@/services/index"
import { useForm } from "vee-validate"
import { reactive } from "vue"
import Heading from "../components/Heading.vue"

const state = reactive({
  error: false,
  success: false,
  loading: false,
})

const { handleSubmit, resetForm } = useForm()

const onSubmit = handleSubmit(async (values) => {
  state.loading = true
  try {
    await contactService.create(values)
    state.success = true
    resetForm()
  } catch {
    state.error = true
  }
  state.loading = false
})
</script>

<template>
  <div>
    <Heading
      tip="contact"
      title="Contactez nous"
      text="Votre demande sera traitée dans les plus bref délais."
    />
    <section>
      <div class="max-w-xs mx-auto flex items-center">
        <div class="mb-16">
          <h3 class="border-l border-primary pl-6 font-semibold text-white">
            Contact téléphonique
          </h3>
          <address
            class="border-l border-neutral-600 pl-6 pt-2 not-italic text-neutral-300"
          >
            <p>Gillioz Delphine</p>
            <a href="tel:+41797626059" class="hover:text-primary"
              >+41 79 762 60 59</a
            >
          </address>
        </div>
      </div>
      <div
        class="relative max-w-xl mx-auto p-8 rounded-lg shadow bg-neutral-800"
      >
        <form @submit="onSubmit">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <Input identifier="firstname" label="Prénom" type="text" />
            </div>
            <div>
              <Input identifier="lastname" label="Nom" type="text" />
            </div>
            <div class="sm:col-span-2">
              <Input identifier="email" label="Email" type="email" />
            </div>
            <div class="sm:col-span-2">
              <Input
                identifier="phone"
                label="Numéro de téléphone"
                type="text"
                placeholder="+41 00 000 00 00"
              />
            </div>
            <div class="sm:col-span-2">
              <Input identifier="subject" label="Sujet" type="text" />
            </div>
            <div class="sm:col-span-2">
              <Textarea identifier="message" label="Message" :rows="4" />
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="w-full button-primary">
                <template v-if="state.loading">
                  <v-spin />
                </template>
                <template v-else>Envoyer</template>
              </button>
            </div>
            <div v-if="state.error" class="sm:col-span-2">
              <error-alert
                title="Une erreur s'est produite !"
                text="Veuillez nous contacter par email: info@thealpinistcollection.com"
              />
            </div>
            <div v-if="state.success" class="sm:col-span-2">
              <success-alert
                title="Votre message a été envoyé avec succès !"
                text="Vous aurez des nouvelles de notre part prochainement."
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
