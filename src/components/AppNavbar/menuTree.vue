<template>
  <div>
    <template v-for="(item) in menuData">
      <!-- 展现本级及子级菜单项 -->
      <el-submenu v-if="item.children.length > 0" :index="item.path" :key="item.path">
        <template slot="title">
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <menu-tree :menuData="item.children"></menu-tree>
      </el-submenu>
      <!-- 展现本级菜单项 -->
      <el-menu-item v-else-if="!item.hidden" :index="item.path" :key="item.path">
        <i :class="item.iconCls"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuTree",
  props: ["menuData"]
};
</script>

<style scoped lang="scss">
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
  display: none;
}
.el-submenu__title span:not(.el-menu--collapse) {
  display: show;
}
</style>
