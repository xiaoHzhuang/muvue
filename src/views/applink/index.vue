<template>
  <div>
    <div class="tabnavBox">
      <transition-group name="list" tag="ul">
        <li
          v-for="(item, index) in $store.getters.tabnavBox"
          @contextmenu.prevent="openMenu(item,$event,index)"
          :key="item.title"
          class="tabnav"
          :class="{ active: $route.path === item.path }"
        >
          <router-link :to="item.path">{{ item.title }}</router-link>
          <i @click="removeTab(item)" class="el-icon-error" v-if="index !== 0"></i>
        </li>
      </transition-group>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li v-if="!isAffix(selectedTag)" @click="removeOtherTab($store.getters.currentNav)">关闭其它</li>
      <li v-if="!isAffix(selectedTag)" @click="removeAllTab">关闭全部</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabNav",
  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {}
    };
  },
  methods: {
    openMenu(item, e, index) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY - 45;
      this.visible = true;
      this.selectedTag = item;
      this.$store.dispatch("openMenu", item);
    },
    removeTab(tabItem) {
      this.$store.dispatch("closeSelectedTag", {
        tabItem,
        fullPath: this.$route.fullPath,
        router: this.$router
      });
    },
    isAffix(tag) {
      return tag.path == "/home";
    },
    closeSelectedTag(tabItem) {
      this.$store.dispatch("closeSelectedTag", {
        tabItem,
        fullPath: this.$route.fullPath,
        router: this.$router
      });
    },
    removeOtherTab(tabItem) {
      this.$store.dispatch("removeOtherTab", { tabItem, router: this.$router });
    },
    removeAllTab() {
      this.$store.dispatch("removeOtherTab", {
        all: true,
        router: this.$router
      });
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", () => {
          this.visible = false;
        });
      } else {
        document.body.removeEventListener("click", () => {
          this.visible = false;
        });
      }
    }
  }
};
</script>
<style>
.tabnav {
  display: inline-block;
  transition: all 0.5s;
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
$leftright: ($left, $right);

%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

.tabnavBox {
  @extend %w100;
  height: 40px;
  min-height: 0 40px;
  overflow: hidden;
  border-#{$top}: 1px solid #f6f6f6;
  border-#{$bottom}: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  ul {
    display: flex;
    justify-content: flex-start;
    padding-#{$left}: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-top: 6px;
    margin-bottom: 5px;
    li {
      height: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;
      @extend %cursor;
      margin-#{$top}: 0px;
      margin-#{$right}: 5px;
      border: 1px solid #cccccc;

      overflow: hidden;
      &:not(:first-child) {
        padding-#{$right}: 10px;
        min-width: 80px;
      }
      a {
        @include set-value(padding, 13px);
        display: inline-block;
        @extend %h100;
        font-size: 12px;
        color: #999999;
      }
      &:nth-child(n + 2) {
        a {
          padding-#{$right}: 15px;
        }
      }
      i {
        @extend %cursor;
        &:hover {
          color: red;
        }
      }
    }
    li.active {
      background: #409eff;
      color: #ffffff;
      a {
        color: #ffffff;
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
.menuBox {
  margin: 0;
  background: #fff;
  z-index: 999;
  position: absolute;
  padding: 5px 0;
  border: 1px solid #cccccc;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 1px 6px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    @extend %cursor;
    &:hover {
      background: #e1e6ea;
    }
  }
}
</style>
