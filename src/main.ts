import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/index"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "windi.css"
import "element-plus/dist/index.css"
import "nprogress/nprogress.css"
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)

app.use(store)
app.mount("#app")
