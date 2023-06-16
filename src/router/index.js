import { onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router"
import { auth } from "../firebase"

import routes from "../routes"

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({
            el: to.hash,
            behavior: "smooth",
          })
        } else {
          resolve({ left: 0, top: 0, behavior: "smooth" })
        }
      }, 500)
    })
  },
})

const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()

  if (to.path === "/login" && user) {
    next("/")
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    next("/login")
    return
  }

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!user) {
      next("/login")
      return
    }

    const tokens = await user.getIdTokenResult()
    if (!tokens.claims.admin) {
      next("/unauthorized")
      return
    }
  }

  next()
})

export default router
