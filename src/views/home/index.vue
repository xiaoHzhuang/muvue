<template>
  <div class="frameContainer" :style="{height:containHeight}">
    <iframe
      id="my-iframe"
      src="./static/rotateCube.html"
      frameborder="0"
      class="frameClass"
      :style="{height: frameHeight,width: frameWidth}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      frameHeight: "100%",
      frameWidth: "100%",
      containHeight: window.innerHeight - 102 + "px"
    };
  },

  components: {},
  mounted() {
    window.onresize = () => {
      return (() => {
        let heightStyle = window.innerHeight - 102 + "px";
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