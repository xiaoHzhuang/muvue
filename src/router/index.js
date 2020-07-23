import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login"
import Layout from "@/components/Layout"
import Home from "@/views/home"

//不是必须加载的组件使用懒加载
const Member = () => import("@/views/member")
const Staff = () => import("@/views/staff")
const Supplier = () => import("@/views/supplier")
const Goods = () => import("@/views/goods")
const Task = () => import("@/views/taskmanage")
const Recycle = () => import("@/views/recyclePicture")
const Carousel = () => import("@/views/carousel")

/**
 * 重写路由的push方法,解决，相同路由跳转时，报错
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter);
/**
 * hidden的值解释
 *   1：代表左侧导航不显示该菜单项，子菜单也不显示
 *   2：代表左侧导航不显示该菜单项，但子菜单可能显示
 *   0：代表左侧导航显示该菜单项及子菜单
 * */
const defaultRouter = [
  {
    path: "/login",
    name:"登录",
    component: Login,
    hidden: 1,//左侧导航不显示该菜单项，子菜单也不显示
    key:1,
    children: []
  },
  {
    path: "/",
    name:"主页A",
    redirect: "/home",
    component: Layout,
    hidden: 2,//左侧导航不显示该菜单项，但子菜单可能显示
    key:2,
    children: [
      {
        path: "/home",
        name: "首页",
        component: Home,
        iconCls: 'el-icon-s-menu',
        hidden: 1,
        key:3,
        meta: { title: "首页" },
        children: []
      },
    ]
  },
];

let addRouter = [{
  path: "/",
  name: "主页B",
  component: Layout,
  hidden: 2,//左侧导航不显示该菜单项，但子菜单可能显示
  key:4,
  children: [
    {
      path: "/staff",
      name: "员工管理",
      component: Staff,
      iconCls: 'el-icon-user',
      meta: { title: "员工管理" },
      hidden: 0,
      key:5,
      children: []
    },
    {
      path: "/supplier",
      name: "供应商管理",
      component: Supplier,
      iconCls: 'el-icon-goods',
      hidden: 0,
      key:6,
      meta: { title: "供应商管理" },
      children: []
    },
    {
      path: "/goods",
      name: "商品管理",
      component: Goods,
      hidden: 0,
      key:7,
      iconCls: 'el-icon-s-goods',
      meta: { title: "商品管理" },
      children: []
    },
    {
      path: "/member",
      name: "会员管理",
      component: Member,
      hidden: 0,
      key:8,
      iconCls: 'el-icon-coordinate',
      meta: { title: "会员管理" },
      children: []
    },
    {
      path: "/recyclePicture",
      name: "轮播图",
      component: Recycle,
      hidden: 0,
      key:9,
      iconCls: 'el-icon-help',
      meta: { title: "轮播图" },
      children: []
    },
    {
      path: "/task",
      name: "任务调度",
      component: Task,
      hidden: 0,
      key:10,
      redirect: "/taskManage",
      iconCls: 'el-icon-postcard',
      meta: { title: "任务调度" },
      children: [
        {
          path: "/taskManage",
          name: "任务管理",
          component: Task,
          hidden: 0,
          key:11,
          iconCls: 'el-icon-help',
          meta: { title: "任务管理" },
          children: []
        },
      ]
    }, {
      path: "/carousel",
      name: "走马灯",
      component: Carousel,
      hidden: 0,
      key:12,
      iconCls: 'el-icon-help',
      meta: { title: "走马灯" },
      children: []
    }
  ]
}]


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: defaultRouter
});

export default router;
export { defaultRouter,addRouter }