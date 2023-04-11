import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useCookies } from "@vueuse/integrations/useCookies"
import { showLaingany, hideLaingany } from "../uilts/Loading"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录页"
    }
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "后台首页"
    }
  },
  {
    path: "/about",
    component: () => import("@/views/about.vue")
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  //显示Loaing加载
  showLaingany()
  const Cookies = useCookies()
  if (Cookies.get("admin-token")) {
    if (to.path == "/login") {
      next("/index")
    } else {
      next()
    }
  } else {
    if (to.path == "/login") {
      next()
    } else {
      next("/login")
    }
  }

  console.log(to.meta.title)
  const title = to.meta.title
  if (typeof title === "string") {
    document.title = title
  }
})
router.afterEach((route) => {
  hideLaingany()
})

export default router
