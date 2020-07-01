<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
body {
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
}
a {
  color: #56a9ff;
  text-decoration: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
