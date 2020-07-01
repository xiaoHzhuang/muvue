<template>
  <el-container>
    <el-header style="height:45px">
      <task-header></task-header>
    </el-header>
    <el-main>
      <!-- <iframe
        id="my-iframe"
        src="./aa.html"
        frameborder="0"
        :style="{height: frameHeight,width: frameWidth}"
      />-->
      <task-main></task-main>
    </el-main>
  </el-container>
</template>

<script>
import TaskHeader from "./taskheader.vue";
import TaskMain from "./taskmain.vue";
export default {
  data() {
    return {
      frameHeight: 100,
      frameWidth: 100,
      orderFoodUrl: "@/views/taskmanage/aa.html"
    };
  },
  components: { TaskHeader, TaskMain },
  methods: {}
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 92.5%;
}
.el-main {
  height: 98%;
  padding: 0;
}
</style>