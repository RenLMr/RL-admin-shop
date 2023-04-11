<template>
  <div class="NotFound">
    <el-col :sm="12" :lg="6">
      <el-result
        icon="warning"
        title="查找不到"
        sub-title="你找的页面已去约会！"
      >
        <template #extra>
          <el-button type="primary" @click="router.push('/')"
            >返回首页</el-button
          >
        </template>
      </el-result>
    </el-col>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>
<style>
.NotFound {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
