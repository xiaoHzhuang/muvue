<template>
  <div id="layout">
    <el-container>
       <app-navbar></app-navbar>
       <el-container>
          <app-header></app-header>
          <app-main></app-main>
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
  methods: {
  }
};
</script>

<style scoped>

 * {
    margin: 0px;
    padding: 0px;
  }
 body {
    background-color: #f2f2f2;
    font-size: 14px;
    color: #333333;
  }
.header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 230px;
  right: 0px;
  padding: 0px;
  background-color: #2d3a4b;
}
.navBar {
  position: absolute;
  width: 230px;
  top: 0px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
}
.appMain {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  overflow-y: auto;
}
</style>