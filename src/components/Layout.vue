<template>
  <div id="layout">
    <el-container>
      <app-navbar></app-navbar>
      <el-container class="container">
        <app-header></app-header>
        <transition name="main" mode="out-in">
          <app-main></app-main>
        </transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";
import AppNavbar from "./AppNavbar";
export default {
  data() {
    return {};
  },
  components: { AppHeader, AppMain, AppNavbar },
  methods: {}
};
</script>
<style>
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
<style scoped  lang="scss">
%h100 {
  height: 100%;
}
%w100 {
  width: 100%;
}
* {
  margin: 0px;
  padding: 0px;
}
body {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333333;
  @extend %h100;
  @extend %w100;
}

html,
body,
#layout,
.el-container {
  @extend %h100;
  @extend %w100;
}
.navBar {
  width: auto !important;
  top: 0px;
  left: 0px;
  bottom: 0px;
  height: 100%;
  overflow-y: auto;
  background-color: #545c64;
}
.container {
  position: relative;
}

.appHeader {
  line-height: 60px;
  background-color: #545c64;
  height: 60px;
  width: 100%;
}

.appMain {
  position: absolute;
  top: 60px;
  right: 0;
  left: 0px;
}
</style>