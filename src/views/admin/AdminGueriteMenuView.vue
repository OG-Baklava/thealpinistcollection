<script setup>
import VLoading from "@/components/VLoading.vue"
import { bookingService } from "@/services"
import { useNotificationStore } from "@/stores/notifications"
import { onMounted, reactive, ref } from "vue"
import AdminGueriteMenuEdit from "./AdminGueriteMenuEdit.vue"
import AdminGueriteMenuPreview from "./AdminGueriteMenuPreview.vue"

const notifStore = useNotificationStore()
const state = reactive({
  loading: false,
  error: false,
  sendLoading: false,
})
const menu = ref(null)

onMounted(async () => {
  state.loading = true
  try {
    const data = await bookingService.getGueriteSettings()
    menu.value = data.menu
  } catch (err) {
    state.error = false
  }
  state.loading = false
})
const onUpdateItem = (values) =>
  (menu.value.sections[values[2]].items[values[1]] = values[0])
const onUpdateParam = (param, value) => (menu.value[param] = value)
const onAddSection = () =>
  menu.value.sections.push({
    items: ["(MODIFIER)"],
  })

const onSectionSplice = (idx) => menu.value.sections.splice(idx, 1)

const onSave = async () => {
  state.sendLoading = true
  try {
    await bookingService.updateGueriteSettings({ menu: menu.value })
    notifStore.add({
      title: "Succès",
      text: "Le menu a bien été sauvegardé !",
      type: "success",
    })
  } catch (error) {
    notifStore.add({
      title: "Erreur",
      text: "Une erreur s'est produite lors de la sauvegarde !",
      type: "error",
    })
  }
  state.sendLoading = false
}
</script>

<template>
  <div>
    <section class="py-6 md:py-10 lg:py-12">
      <div v-if="state.loading">
        <v-loading />
      </div>
      <div v-else-if="menu" class="grid sm:grid-cols-2 gap-x-4">
        <div>
          <AdminGueriteMenuEdit
            :menu="menu"
            :send-loading="state.sendLoading"
            @on-update-item="onUpdateItem"
            @on-update-param="onUpdateParam"
            @add-section="onAddSection"
            @section-splice="onSectionSplice"
            @on-save="onSave"
          />
        </div>
        <div>
          <AdminGueriteMenuPreview :menu="menu" />
        </div>
      </div>
    </section>
  </div>
</template>
