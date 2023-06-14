<script setup>
import VDatePicker from "@/components/VDatePicker.vue"
import VSpin from "@/components/VSpin.vue"
import FormCheckbox from "@/components/form/FormCheckbox.vue"
import { useNotificationStore } from "@/stores/notifications"
import { collection, doc } from "firebase/firestore"
import { useForm } from "vee-validate"
import { reactive, ref, watch } from "vue"
import { useDocument, useFirestore } from "vuefire"

import { bookingService } from "@/services"

const notifStore = useNotificationStore()
const modelDate = ref()
const db = useFirestore()
const { handleSubmit, resetForm } = useForm()
const state = reactive({
  sendLoading: false,
  modelDateError: false,
})

const onSubmit = handleSubmit(async (values) => {
  state.sendLoading = true
  if (!modelDate.value) {
    state.modelDateError = true
    state.sendLoading = false
    return
  }
  state.modelDateError = false
  try {
    let d = modelDate.value
    d.setHours(3, 0, 0, 0)
    await bookingService.updateSettings({
      holiday: {
        date: d,
        active: values.active ? values.active : false,
      },
    })
    notifStore.add({
      title: "Succès",
      text: "les paramètres ont été enregistré !",
      type: "success",
    })
    resetForm()
    modelDate.value = null
  } catch (error) {
    notifStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
  state.sendLoading = false
})

const { pending: pendingSettings, data: settings } = useDocument(
  doc(collection(db, "bookSettings"), "general")
)

watch(pendingSettings, (isLoading) => {
  if (isLoading == false && settings.value.holiday?.date) {
    modelDate.value = settings.value.holiday.date.toDate()
  }
})
</script>
<template>
  <div>
    <section>
      <div class="grid grid-cols-2">
        <div class="shadow rounded-lg p-6 bg-neutral-800">
          <form v-if="!pendingSettings" class="max-w-xl" @submit="onSubmit">
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <FormCheckbox
                  identifier="active"
                  label="Actif"
                  :val="settings.holiday.active"
                  text="Contrôle la visibilité du label de vacances sur le site"
                />
              </div>
              <div>
                <label
                  for="date"
                  :class="['block text-sm font-medium text-primary']"
                  >Date</label
                >
                <div class="mt-1">
                  <VDatePicker v-model="modelDate" />
                </div>
                <p
                  v-if="state.modelDateError"
                  class="mt-2 text-sm text-red-600"
                >
                  Le champ est requis
                </p>
              </div>
              <div class="sm:col-start-2">
                <button type="submit" class="button-primary float-right">
                  <template v-if="state.sendLoading"><VSpin /></template
                  ><template v-else>Sauvegarder</template>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
