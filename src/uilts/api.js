import $axios from "./request"

//登录接口
export const loginApi = (params) => $axios.post("admin/login", params)

//退出登录
export const removeApi = (params) => $axios.post("admin/logout", params)

//获取用户信息
export const getinfoApi = (params) => $axios.post("admin/getinfo", params)
