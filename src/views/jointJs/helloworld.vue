<template>
  <el-container>
    <el-header>
      <el-button type="primary" round @click="scale">缩放</el-button>
      <el-button type="primary" round @click="translate">移动</el-button>
    </el-header>
    <el-main>
      <div id="myholder"></div>
    </el-main>
  </el-container>
</template>

<script>
import "jointjs/dist/joint.css";
import $ from "jquery";
import lodash from "lodash";
import backbone from "backbone";
import joint from "jointjs";

export default {
  name: "App",
  data: function() {
    return {
      active: true,
      paper: null,
    };
  },
  mounted: function() {
    this.inti();
  },
  methods: {
    inti() {
      var graph = new joint.dia.Graph();
      this.paper = new joint.dia.Paper({
        el: document.getElementById("myholder"),
        model: graph,
        width: 600,
        height: 400,
        gridSize: 15,
        drawGrid: true,
        background: {
          color: "rgba(0, 255, 0, 0.3)",
        },
      });

      var rect = new joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: "blue",
        },
        label: {
          text: "Hello",
          fill: "white",
        },
      });
      rect.addTo(graph);

      var rect2 = new joint.shapes.standard.Rectangle();
      rect2.position(400, 30);
      rect2.resize(100, 40);
      rect2.attr({
        body: {
          fill: "#2C3E50",
          rx: 5,
          ry: 5,
          strokeWidth: 2,
        },
        label: {
          text: "World!",
          fill: "#3498DB",
          fontSize: 18,
          fontWeight: "bold",
          fontVariant: "small-caps",
        },
      });
      rect2.addTo(graph);

      var link = new joint.shapes.standard.Link();
      link.attr({
        line: {
          stroke: "red",
          sourceMarker: {
            type: "path",
            stroke: "black",
            fill: "red",
            d: "M 10 -5 0 0 10 5 Z",
          },
          targetMarker: {
            type: "path",
            fill: "blue",
            stroke: "orange",
            "stroke-width": 2,
            d: "M 10 -5 0 0 10 5 Z",
          },
        },
      });
      link.labels([
        {
          attrs: {
            text: {
              text: "Hello, World",
            },
          },
        },
      ]);
      link.source(rect);
      link.target(rect2);
      link.addTo(graph);
    },
    scale() {
      this.paper.scale(0.5, 0.5);
    },
    translate() {
      this.paper.translate(300, 50);
    },
  },
};
</script>

<style scoped>
#myholder {
  width: 900px;
  height: 700px;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid #d3d3d3;
}
</style>
