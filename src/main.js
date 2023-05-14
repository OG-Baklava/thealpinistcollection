import { createPinia } from "pinia"
import { SetupCalendar } from "v-calendar"
import "v-calendar/dist/style.css"
import { createApp } from "vue"
import { VueFire } from "vuefire"
import App from "./App.vue"
import "./assets/style.css"
import { app } from "./firebase"
import router from "./router"

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueFire, {
    app,
    modules: [],
  })
  .use(SetupCalendar, {})
  .mount("#app")
