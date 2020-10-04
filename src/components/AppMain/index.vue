<template>
  <el-main class="appMain">
    <app-link></app-link>
    <transition name="main" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
import AppLink from "@/views/applink";
export default {
  data() {
    return {};
  },

  components: { AppLink },

  methods: {},
};
</script>
<style>
  .main-enter, .main-leave-to {
    opacity: 0;
    transform: translateY(10px);

  }
  .main-enter-active {
    transition: all 0.2s;
  }
  .main-leave-active {
    position: absolute;
    transition: all 0.3s;
  }
</style>
<style scoped></style>
