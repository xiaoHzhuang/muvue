<template>
  <el-main class="appMain">
    <app-link></app-link>
    <router-view></router-view>
  </el-main>
</template>

<script>
import AppLink from "@/views/applink";
export default {
  data() {
    return {};
  },

  components: { AppLink },

  methods: {}
};
</script>

<style scoped>
</style>