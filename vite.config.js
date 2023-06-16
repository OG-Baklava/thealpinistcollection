import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { defineConfig } from "vite"

import robotsPlugin from "./robotsPlugin"
import sitemapPlugin from "./sitemapPlugin"

process.env = {
  ...process.env,
  VITE_BASE_URL: "https://thealpinistcollection.com",
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), robotsPlugin(), sitemapPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
