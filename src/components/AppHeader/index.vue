<template>
  <el-header class="appHeader">
    <div class="leftContainer">
      <span class="hideAside" @click="collapse">
        <i class="el-icon-my-collapse"></i>
      </span>
      <span class="systemPic">
        <img class="logo" src="@/assets/logo.png" width="25px" />
        <span class="company">管理系统</span>
      </span>
    </div>
    <div class="moduleContainer">
      <div style="width:500px;margin:0 auto;height:60px">
        <swiper
          class="swiper"
          ref="mySwiper"
          :options="swiperOption"
          @click-slide="handleClickSlide"
          @click-="handleClickSlide"
        >
          <swiper-slide style="width:80px" v-for="(item,index) in moduleList"  :key="index">
            <el-image
              style="width: 70px; height: 60px"
              :src="require('../../assets/images/modules/'+item.iconcls)"
              @click="clickImage(item.id)"
            ></el-image>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="rightContainer">
      <el-dropdown @command="handleCommand" style="float:right">
        <span class="el-dropdown-link">
          {{$store.state.user.user}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar shape="square" :size="25" icon="el-icon-my-user" style="float:right"></el-avatar>
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom" style="float:right">
        <i class="el-icon-my-fullscreen" @click="fullScreen"></i>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
import { logOut } from "@/api/login/login";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import headerApi from "@/api/appHeader/header";
import { menuNodeContainer } from "@/router/index";

export default {
  data() {
    return {
      isfullScreen: true,
      moduleList: [],
      swiperOption: {
        // 每页展示几条数据
        slidesPerView: 4,
        parallax: true,
        autoplay: true,
        reverseDirection: true,
        speed: 100,
        // 每屏滚动几条数据
        slidesPerGroup: 4,
        spaceBetween: 0,
        grabCursor: true,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        observer: true,
        observeParents: true,
        onSlideChangeEnd: function(swiper) {
          swiper.update();
          mySwiper.startAutoplay();
          mySwiper.reLoop();
        },
        on: {
          click: function(e) {}
        }
      }
    };
  },
  components: { Swiper, SwiperSlide },
  created() {
    this.fetchModuleList();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    fetchModuleList() {
      headerApi.fetchModuleList().then(response => {
        const respData = response.data;
        if (respData.status) {
          this.moduleList = respData.data;
        }
      });
    },
    clickImage(moduleId) {
      console.log(moduleId);
      headerApi.fetchMenuList(moduleId).then(response => {
        this.reloadRouerMenu(response.data.data);
      });
    },
    reloadRouerMenu(dataArray) {
      const layoutNodeChild = [];
      for (let i = 0; i < dataArray.length; i++) {
        const menuNode = {
          path: dataArray[i].path,
          name: dataArray[i].name,
          component: menuNodeContainer.get(dataArray[i].component),
          iconCls: dataArray[i].iconcls,
          meta: { title: dataArray[i].name },
          children: []
        };
        layoutNodeChild.push(menuNode);
      }
      this.$store.dispatch("addRouters", layoutNodeChild);
    },
    collapse() {
      this.$store.dispatch("collapse");
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          break;
        case "b":
          logOut(localStorage.getItem("my-vue-token")).then(response => {
            const resp = response.data;
            if (
              resp.status == -1 ||
              resp.data == 401 ||
              resp.data.status == 402
            ) {
              localStorage.removeItem("my-vue-token");
              localStorage.removeItem("my-vue-user");
              this.$router.push("/login");
            } else {
              this.$message({
                message: "注销失败",
                type: "warning"
              });
            }
          });
          break;
        default:
          break;
      }
    },
    handleClickSlide() {},
    prevClick() {
      this.swiper.slidePrev();
    },
    rightClick() {
      this.swiper.slideNext();
    },
    fullScreen() {
      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.leftContainer {
  position: absolute;
  width: 15%;
  height: 60px;
  min-width: 150px;
  .hideAside {
    cursor: pointer;
    vertical-align: middle;
  }
  .systemPic {
    .logo {
      vertical-align: middle;
      padding: 0 10px 0 40px;
    }
  }
}
.moduleContainer {
  position: absolute;
  float: left;
  width: 65%;
  height: 60px;
  left: 15%;
  .swiper-slide {
    height: 60px;
    font-size: 50px;
    text-align: center;
    line-height: 40px;
  }
}
.rightContainer {
  position: absolute;
  width: 20%;
  height: 60px;
  left: 80%;
  .el-avatar {
    margin-top: 18px;
    margin-right: 18px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    margin-right: 15px;
  }
  .el-tooltip {
    margin-top: 17px;
    margin-right: 10px;
  }
}
</style>