<template>
  <div class="block">
    <span class="demonstration">默认 Hover 指示器触发</span>
    <el-carousel height="150px" indicator-position="outside"  type="card">
      <el-carousel-item v-for="item in images" :key="item">
        <el-image
          style="width:100%; height: 60px"
          :src="require('../../assets/images/modules/'+item.iconcls)"
          @click="clickImage(item.id)"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { iconcls: "module1.svg" },
        { iconcls: "module2.svg" },
        { iconcls: "module3.svg" },
        { iconcls: "module4.svg" },
        { iconcls: "module5.svg" }
      ]
    };
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>