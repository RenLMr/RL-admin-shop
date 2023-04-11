import axios from "axios"
import { useCookies } from "@vueuse/integrations/useCookies"

const $axios = axios.create({
  baseURL: "/api",
  timeout: 1000
})

$axios.interceptors.request.use((config) => {
  const cookies = useCookies()
  if (cookies.get("admin-token")) {
    config.headers.token = cookies.get("admin-token")
  }
  return config
})

$axios.interceptors.response.use((res) => {
  return res
})

export default $axios
