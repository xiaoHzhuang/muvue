<template>
  <div>
    count: {{$store.state.staff.count}}
    <div>
      <button @click="addCount">加法</button>
      <button @click="decrement">减法</button>
    </div>
    派生属性desc:{{$store.getters.desc}}
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          "icon": "el-icon-menu",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  components: {},

  methods: {
    addCount() {
      this.$store.dispatch("add", 10);
    },
    decrement() {
      this.$store.dispatch("decrement");
    },
    handleNodeClick(data) {
      console.log(data);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    }
  }
};
</script>

<style scoped>
</style>