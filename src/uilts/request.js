import axios from "axios"

const $axios = axios.create({
  baseURL: "/api",
  timeout: 1000
})

$axios.interceptors.request.use((config) => {
  return config
})

$axios.interceptors.response.use((res) => {
  return res
})

export default $axios
