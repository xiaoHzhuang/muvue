<template>
  <div class="frameContainer" :style="{height:containHeight}">
    <iframe
      id="rainFlower-iframe"
      src="./static/rainFlower.html"
      frameborder="0"
      :style="{height: frameHeight,width: frameWidth,position:framePosition}"
      style="z-index:2"
      onload
    />
    <iframe
      id="rotateCube-iframe"
      src="./static/rotateCube.html"
      frameborder="0"
      class="frameClass"
      :style="{height: frameHeight,width: frameWidth,position:framePosition}"
      style="z-index:3"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      frameHeight: window.innerHeight - 102 + "px",
      frameWidth: "100%",
      framePosition:"absolute",
      containHeight: window.innerHeight - 102 + "px"
    };
  },

  components: {},
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 102 + "px";
        this.frameHeight=heightStyle;
        this.containHeight = heightStyle;
      })();
    };
  },
  methods: {}
};
</script>

<style scoped>
.frameClass {
  overflow: "-Scroll";
  overflow-y: hidden;
}
</style>