import { defineStore } from "pinia"

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    remove(notificationId) {
      let index = this.$state.notifications
        .map((n) => n.id)
        .indexOf(notificationId)
      if (index == -1) return
      clearTimeout(this.$state.notifications[index].timeout)
      this.$state.notifications.splice(index, 1)
    },
    add(notification) {
      let id = Date.now()
      let timeout = setTimeout(() => {
        this.remove(id)
      }, 5000)
      this.$state.notifications.push({
        raw: notification,
        id: id,
        timeout: timeout,
      })
    },
  },
})
