<template>
  <el-header class="appHeader">
    <span class="hideAside" @click="collapse">
        <i class="el-icon-my-collapse"></i>
    </span>
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{$store.state.user.user}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
import { logOut } from "@/api/login";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    collapse() {
      this.$store.dispatch("collapse");
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          break;
        case "b":
          logOut(localStorage.getItem("my-vue-token")).then(response => {
            const resp = response.data;
            if (resp.status == -1 || resp.data.status == 401 || resp.data.status == 402) {
              localStorage.removeItem("my-vue-token");
              localStorage.removeItem("my-vue-user");
              this.$router.push("/login");
            } else {
              this.$message({
                message: "注销失败",
                type: "warning"
              });
            }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.hideAside {
  cursor: pointer;
}
</style>