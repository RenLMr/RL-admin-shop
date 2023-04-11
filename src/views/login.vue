<template lang="">
  <el-row class="login">
    <el-col
      :lg="16"
      :md="12"
      class="login_txt"
      style="display: flex; justify-content: center; align-items: center"
      >欢迎加入</el-col
    >
    <el-col
      :lg="8"
      :md="12"
      class="right"
      style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      "
    >
      <h2 class="right_title">欢迎回来</h2>
      <div class="right_div">
        <span class="Line"></span>
        <span class="right_font">账号密码登录</span>
        <span class="Line"></span>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="form_w"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon><User /></el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="but"
            round
            color="#626aef"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { loginApi } from "@/uilts/api"
// import { ElNotification } from "element-plus"
const router = useRouter()
let ruleForm = reactive({
  username: "",
  password: ""
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi({ ...ruleForm }).then((res) => {
        console.log(res)
        // ElNotification({
        //   title: "Success",
        //   message: "登录成功",
        //   type: "success"
        // })
        //存储Cookies
        const Cookies = useCookies()
        Cookies.set("admin-token", res.data.data.token)
        router.push("/index")
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>
<style lang="scss">
.login {
  @apply bg-blue-500 min-h-screen;
  .login_txt {
    @apply text-light-50 font-bold;
  }
  .right {
    @apply bg-light-50;
    .right_title {
      @apply font-bold text-2xl;
    }
    .right_div {
      @apply my-5 text-gray-300 flex items-center;
      .Line {
        @apply h-[1px] w-16 bg-gray-200;
      }
      .right_font {
        @apply mx-2;
      }
    }
    .form_w {
      @apply w-[250px];
      .but {
        @apply w-[250px];
      }
    }
  }
}
</style>
