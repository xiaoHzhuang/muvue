<template>
  <div class="tabnavBox">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="(item) in $store.getters.tabnavBox"
        :key="item.title"
        :label="item.title"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "tabNav",
  data() {
    return {
      editableTabsValue: "editableTabsValue"
    };
  },
  methods: {
    removeTab(targetName) {
      console.log(" removeTab(targetName) :" + targetName);
      this.$store.dispatch("removeTab", {
        tabPath: targetName
      });
    },
    clickTab(tab) {
      this.$router.push(tab.name);
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.tabnav {
  display: inline-block;
  transition: all 0.5s;
}
.el-tabs--card  {
  //  background-color:  #e4e7ed;
  height: 20px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #cccccc;
  border-left: 10px solid white;
  background-color: #e4e7ed;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-enter-active {
  transition: all 0.5s;
}

.list-leave-active {
  position: absolute;
  transition: all 1s;
}
</style>
<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;

%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

a {
  text-decoration: none;
}
.tabnavBox {
  @extend %w100;
  height: 40px;
  min-height: 40px;
  overflow: hidden;
  border-#{$top}: 0px solid #f6f6f6;
  border-#{$bottom}: 0px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  // padding: 2px;
}
</style>
