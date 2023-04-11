import $axios from "./request"

export const loginApi = (params) => $axios.post("admin/login", params)
