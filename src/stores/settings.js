import { bookingService } from "@/services"
import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
  const data = ref({})
  const loading = ref(false)
  const error = ref(false)
  const holidayClosed = ref(false)

  const fetch = async () => {
    loading.value = true
    try {
      let res = await bookingService.getGeneralSettins()
      data.value = res
    } catch (err) {
      error.value = true
    }
    loading.value = false
  }

  const closeHoldiayBanner = () => (holidayClosed.value = true)

  return {
    data,
    loading,
    fetch,
    holidayClosed,
    closeHoldiayBanner,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
