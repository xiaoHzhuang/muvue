<template>
  <div class="wrapper">
    <swiper
      class="swiper"
      ref="mySwiper"
      :options="swiperOption"
      @click-slide="handleClickSlide"
      @click-="handleClickSlide"
    >
      <swiper-slide style="width:80px" v-for="(item,index) in moduleList" :key="index">
        <el-image
          style="width: 70px; height: 60px"
          :src="require('../../assets/images/modules/'+item.iconcls)"
          @click="clickImage(item.id)"
        ></el-image>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import headerApi from "@/api/appHeader/header";

export default {
  data() {
    return {
      moduleList: [],
      swiperOption: {
        loop: true,
        autoplay: true,
        grabCursor: true,
        observer: true,
        observeParents: true,
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 1,
        direction: "horizontal",
        parallax: true,
        preloadImages: true,
        normalizeSlideIndex: false,
        updateOnImagesReady: true,
        disabledClass: "my-button-disabled",
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          click: function(e) {
            console.log(this.clickedIndex);
          }
        }
      }
    };
  },
  created() {
    this.fetchModuleList();
  },
  components: {
    swiper,
    swiperSlide
  },
  directives: {},
  methods: {
    handleClickSlide() {
      console.log("A");
    },
    fetchModuleList() {
      headerApi.fetchModuleList().then(response => {
        const respData = response.data;
        if (respData.status) {
          this.moduleList = respData.data;
        }
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 500px;
  height: 400px;
  margin-left: 100px;
  margin-top: 100px;

  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
}
.my-button-disabled {
  opacity: 0.2;
}
.swiper-slide {
  height: 100px;
  background: pink;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
}
</style>