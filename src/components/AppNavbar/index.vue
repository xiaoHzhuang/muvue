<template>
  <div class="navBar">
    <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical"
      :collapse="$store.getters.isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(item) in $store.getters.routers" v-if="!item.hidden">
        <!-- 展现本级及子级菜单项 -->
        <el-submenu v-if="!item.alone && item.children.length>0" :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name}}</span>
          </template>
          <menu-tree :menuData="item.children"></menu-tree>
        </el-submenu>
        <!-- 不展现本级菜单项,仅展现子级菜单项 -->
        <template v-else-if="item.alone && item.children.length>0 && item.name==''" :index="item.path">
          <menu-tree :menuData="item.children" :key="item.path"></menu-tree>
        </template>
        <!-- 没有子级菜单,仅展示本级菜单项 -->
        <el-menu-item :index="item.path" v-else :key="item.path">
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
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
    }
  },
  methods: {
    selectmenu(key) {
      let title = this.$route.meta.title;
      let path = this.$route.path;
      this.$store.dispatch("addTab", {
        title: title,
        path: path
      });
    }
  }
};
</script>

<style scoped lang="scss">
%h100 {
  height: 100%;
}

.navBar {
  overflow-x: hidden;
  background-color: "#545c64";
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .el-menu {
    flex: 1;
    margin-top: 60px;
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