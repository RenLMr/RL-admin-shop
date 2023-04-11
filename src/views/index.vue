<template lang="">
  <el-container>
    <el-header
      class="bg-indigo-600 h-[60px] flex items-center justify-between pl-10"
    >
      <div class="w-[300px] flex items-center justify-between">
        <span class="text-light-50 text-2xl">积云商城</span>
        <span></span>
        <el-icon color="#fff"><Fold /></el-icon>
        <el-icon color="#fff" @click="RefX"> <Refresh /></el-icon>
      </div>
      <div class="flex items-center justify-between">
        <el-icon color="#fff" @click="toggle"><FullScreen /></el-icon>
        <span class="flex items-center justify-between ml-20px">
          <img
            src="../assets/logo.png"
            alt=""
            style="width: 30px; height: 30px; border-radius: 15px"
          />
          <el-dropdown
            ref="dropdown1"
            trigger="contextmenu"
            style="margin-left: 5px"
          >
            <span
              class="el-dropdown-link text-light-50 flex items-center"
              @click="showClick"
              >admin<el-icon><ArrowDown /></el-icon
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="remove">退出登录</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          router
        >
          <el-sub-menu
            :index="item.desc"
            v-for="(item, index) in List"
            :key="index"
          >
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="item2 in item.child" :key="item2.id">
              <el-menu-item :index="item.desc">{{ item2.name }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { removeApi, getinfoApi } from "../uilts/api"
import { ElMessage, ElMessageBox } from "element-plus"
import { useCookies } from "@vueuse/integrations/useCookies"
import { useFullscreen } from "@vueuse/core"

const { isFullscreen, toggle } = useFullscreen()

const dropdown1 = ref()
const router = useRouter()
const List = ref([])
function showClick() {
  dropdown1.value.handleOpen()
}
//退出登录
const remove = () => {
  ElMessageBox.confirm("确定要退出登录吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    ElMessage({
      type: "success",
      message: "退出成功"
    })
    removeApi()
      .then((res) => {
        console.log(res)
        const Cookies = useCookies()
        Cookies.remove("admin-token")
        router.push("/login")
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "Delete canceled"
        })
      })
  })
}
//刷新
const RefX = () => {
  location.reload()
}
//获取菜单
getinfoApi().then((res) => {
  console.log(res)
  List.value = res.data.data.menus
  console.log(List)
})
</script>
<style lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
