<template>
  <iframe
    id="my-iframe"
    src="./static/rainFlower.html"
    frameborder="0"
    :style="{height: frameHeight,width: frameWidth}"
  />
</template>

<script>
export default {
  data() {
    return {
      frameHeight: '92.2%',
      frameWidth: '100%'
    };
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>