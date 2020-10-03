<template>
  <div style="background-color:#545c64">
    <div class="navBar" style="calc(100% - 60px)">
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical"
        :collapse="$store.getters.isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="true"
        :unique-opened="true"
      >
        <!-- 
      hidden的值解释
      1：代表左侧导航不显示该菜单项，子菜单也不显示
      2：代表左侧导航不显示该菜单项，但子菜单可能显示
      0：代表左侧导航显示该菜单项及子菜单
    -->
        <template
          v-for="item in $store.getters.routers"
          v-if="item.hidden !== 1"
        >
          <!-- 展现本级及子级菜单项 -->
          <el-submenu
            v-if="item.hidden === 0 && item.children.length > 0"
            :index="item.path"
            :key="item.key"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <menu-tree :menuData="item.children"></menu-tree>
          </el-submenu>
          <!-- 不展现本级菜单项,仅展现子级菜单项 -->
          <template
            v-else-if="item.hidden === 2 && item.children.length > 0"
            :index="item.path"
          >
            <menu-tree :menuData="item.children" :key="item.key"></menu-tree>
          </template>
          <!-- 没有子级菜单,仅展示本级菜单项 -->
          <el-menu-item v-else :index="item.path" :key="item.key">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import menuTree from "./menuTree";

export default {
  data() {
    return {};
  },
  components: { menuTree },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    "$route.path": function(val) {
      this.selectmenu(val);
    },
  },
  methods: {
    selectmenu(key) {
      let title = this.$route.meta.title;
      let path = this.$route.path;
      this.$store.dispatch("addTab", {
        title: title,
        path: path,
      });
    },
  },
};
</script>

<style scoped lang="scss">
%h100 {
  height: 100%;
}
.navBar::-webkit-scrollbar {
  width: 4px;
}
.navBar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.navBar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.navBar {
  margin-top: 60px;
  width: auto !important;
  height: calc(100% - 60px) !important;
  overflow-y: auto;
  background-color: "#545c64";
  border-right: solid 1px #545c64;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .fa {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item {
      &:hover {
        color: #ffffff !important;
        background-color: #375573 !important;
      }
    }
    .el-menu-item.is-active {
      background-color: #56a9ff !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
    /*隐藏文字*/
    .el-menu--collapse .el-submenu__title span {
      display: none;
    }
    .el-submenu__title span:not(.el-menu--collapse) {
      display: show;
    }
  }
}
</style>
<style>
.navBar .el-submenu__title .el-submenu__icon-arrow {
  position: absolute;
  top: 50%;
  right: 30px;
  margin-top: -7px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  font-size: 12px;
}
</style>
