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
      <template v-for="(item,index) in $store.getters.routers" v-if="!item.hidden">
        <el-submenu v-if="!item.alone && item.children.length>0" :index="index+''">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name}}</span>
          </template>
          <menu-tree :menuData="item.children"></menu-tree>
        </el-submenu>
        <template v-else-if="item.children.length>0 && item.name==''" :index="index+''">
          <menu-tree :menuData="item.children"></menu-tree>
        </template>
        <el-menu-item :index="item.path" v-else>
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
  }
}
</style>