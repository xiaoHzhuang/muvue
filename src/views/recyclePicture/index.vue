<template>
  <div class="wrapper">
    <el-button class="prevButton" icon="el-icon-arrow-left" circle @click="prevClick"></el-button>
    <swiper
      class="swiper"
      ref="mySwiper"
      :options="swiperOption"
      @click-slide="handleClickSlide"
      @click-="handleClickSlide"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper>
    <el-button class="rightButton" icon="el-icon-arrow-right" circle @click="rightClick"></el-button>
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        // 每页展示几条数据
        slidesPerView: 3,
        // 每屏滚动几条数据
        slidesPerGroup: 4,
        spaceBetween: 30,
        grabCursor: true,
        direction: "horizontal",
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          type: ""
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        observer: true,
        observeParents: true,
        on: {
          click: function(e) {
            console.log(e);
          }
        }
      }
    };
  },

  components: {
    Swiper,
    SwiperSlide
  },
  directives: {},
  methods: {
    handleClickSlide() {
      console.log("A");
    },
    prevClick() {
     this.swiper.slidePrev();
    },
    rightClick() {
     this.swiper.slideNext();
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 500px;
  height: 400px;
  margin-left: 100px;
  margin-top: 100px;
}
.swiper-slide {
  height: 100px;
  background: pink;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
}
.prevButton {
  position: absolute;
  left: 20px;
  top: 160px;
}
.rightButton {
  position: absolute;
  right: 500px;
  top: 160px;
}
</style>