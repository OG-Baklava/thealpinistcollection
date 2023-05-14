import { defineStore } from "pinia"
import router from "../router"
import { auth } from "../firebase"
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"

export const useAuthUserStore = defineStore("auth/user", {
  state: () => ({
    user: null,
    isAdmin: null,
  }),
  // getters: {
  //   user: (state) => state.user,
  // },
  actions: {
    async login(details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found")
            break
          case "auth/wrong-password":
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      const tokens = await auth.currentUser.getIdTokenResult()
      this.$state.user = auth.currentUser
      this.$state.isAdmin = !!tokens.claims.admin
      router.push("/")
    },
    async register(details) {
      const { name, email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use")
            break
          case "auth/invalid-email":
            alert("Invalid email")
            break
          case "auth/operation-not-allowed":
            alert("Operation not allowed")
            break
          case "auth/weak-password":
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      this.$state.user = auth.currentUser
      this.$state.isAdmin = false
      router.push("/")
    },
    async logout() {
      await signOut(auth)

      this.clearUser()
      router.push("/login")
    },
    fetchUser() {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.clearUser()
        } else {
          const tokens = await user.getIdTokenResult()
          this.$state.user = user
          this.$state.isAdmin = !!tokens.claims.admin
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/")
          }
        }
      })
    },
    clearUser() {
      this.$reset()
    },
  },
})
