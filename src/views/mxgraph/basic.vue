<template>
  <div id="graphContainer"></div>
</template>

<script>
import mxgraph from "@/api/mxgraph/mxgraph.js";
const {
  mxGraph,
  mxClient,
  mxCodec,
  mxUtils,
  mxConstants,
  mxPerimeter,
} = mxgraph;
export default {
  data() {
    return {};
  },

  components: {},
  mounted() {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // 再容器中创建图表
      let container = document.getElementById("graphContainer");
      let MxGraph = mxGraph;
      let MxCodec = mxCodec;
      var graph = new MxGraph(container);
      // 生成 Hello world!
      var parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      try {
        var v1 = graph.insertVertex(parent, null, "Hello,", 20, 200, 80, 30);
        var v2 = graph.insertVertex(parent, null, "World", 200, 150, 80, 30);
        var v3 = graph.insertVertex(
          parent,
          null,
          "everyBody!",
          300,
          350,
          60,
          60
        );
        graph.insertEdge(parent, null, "", v1, v2);
        graph.insertEdge(parent, null, "", v2, v3);
        graph.insertEdge(parent, null, "", v1, v3);
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
      // 打包XML文件
      let encoder = new MxCodec();
      let xx = encoder.encode(graph.getModel());
      // 保存到getXml参数中
      this.getXml = mxUtils.getXml(xx);
    }
  },
  methods: {},
};
</script>

<style scoped></style>