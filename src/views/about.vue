<template lang="">
  <div>
    {{ $store.state.name }}
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>
<style lang=""></style>
