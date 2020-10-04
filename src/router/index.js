import en from "../i18n/lang/en";
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/components/Layout";
import Home from "@/views/home";

//不是必须加载的组件使用懒加载
const Member = () => import("@/views/member");
const Staff = () => import("@/views/staff");
const Supplier = () => import("@/views/supplier");
const Goods = () => import("@/views/goods");
const Task = () => import("@/views/taskmanage");
const Recycle = () => import("@/views/recyclePicture");
const Carousel = () => import("@/views/carousel");
const Kafka = () => import("@/views/kafka");
const Arrangement = () => import("@/views/arrangement");
const FileUpload = () => import("@/views/fileupload");
const Accordion = () => import("@/views/accordion");
const Drawer = () => import("@/views/drawer");
const jointJsHello = () => import("@/views/jointJs/helloworld.vue");
const jointJsLink = () => import("@/views/jointJs/link.vue");
const jointJsElement = () => import("@/views/jointJs/element.vue");
const jointJs = () => import("@/views/jointJs");
const MxGraph = () => import("@/views/mxgraph");
const MxGraphBasic = () => import("@/views/mxgraph/basic.vue");
const MxGraphToolBar = () => import("@/views/mxgraph/toolbar.vue");
/**
 * 重写路由的push方法,解决，相同路由跳转时，报错
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
Vue.use(VueRouter);
let routeName = en.routeName
/**
 * hidden的值解释
 *   1：代表左侧导航不显示该菜单项，子菜单也不显示
 *   2：代表左侧导航不显示该菜单项，但子菜单可能显示
 *   0：代表左侧导航显示该菜单项及子菜单
 * */
const defaultRouter = [
  {
    path: "/login",
    name:  routeName.login,
    component: Login,
    hidden: 1, //左侧导航不显示该菜单项，子菜单也不显示
    key: 1,
    children: [],
  },
  {
    path: "/",
    name: "主页",
    redirect: "/login",
    component: Layout,
    hidden: 2, //左侧导航不显示该菜单项，但子菜单可能显示
    key: 2,
    children: [
      {
        path: "/home",
        name: routeName.home,
        component: Home,
        iconCls: "el-icon-s-menu",
        hidden: 1,
        key: 3,
        meta: { title: routeName.home },
        children: [],
      },
      {
        path: "/login",
        name:  routeName.home,
        component: Login,
        hidden: 1, //左侧导航不显示该菜单项，子菜单也不显示
        key: 1,
        children: [],
      },
    ],
  },
];

let addRouter = [
  {
    path: "/",
    name: "主页B",
    component: Layout,
    hidden: 2, //左侧导航不显示该菜单项，但子菜单可能显示
    key: 4,
    children: [
      {
        path: "/staff",
        name: routeName.staff,
        component: Staff,
        iconCls: "el-icon-user",
        meta: { title:  routeName.staff},
        hidden: 0,
        key: 5,
        children: [],
      },
      {
        path: "/supplier",
        name: routeName.supplier,
        component: Supplier,
        iconCls: "el-icon-goods",
        hidden: 0,
        key: 6,
        meta: { title: routeName.supplier},
        children: [],
      },
      {
        path: "/goods",
        name: routeName.goods,
        component: Goods,
        hidden: 0,
        key: 7,
        iconCls: "el-icon-s-goods",
        meta: { title: routeName.goods },
        children: [],
      },
      {
        path: "/member",
        name: routeName.member,
        component: Member,
        hidden: 0,
        key: 8,
        iconCls: "el-icon-coordinate",
        meta: { title: routeName.member },
        children: [],
      },
      {
        path: "/recyclePicture",
        name: routeName.sidesShow,
        component: Recycle,
        hidden: 0,
        key: 9,
        iconCls: "el-icon-help",
        meta: { title: routeName.sidesShow },
        children: [],
      },
      {
        path: "/task",
        name: routeName.task,
        component: Task,
        hidden: 0,
        key: 10,
        redirect: "/taskManage",
        iconCls: "el-icon-postcard",
        meta: { title: routeName.task },
        children: [
          {
            path: "/taskManage",
            name: routeName.taskManage,
            component: Task,
            hidden: 0,
            key: 11,
            iconCls: "el-icon-help",
            meta: { title: routeName.taskManage},
            children: [],
          },
        ],
      },
      {
        path: "/carousel",
        name:  routeName.horseLamp,
        component: Carousel,
        hidden: 0,
        key: 12,
        iconCls: "el-icon-help",
        meta: { title: routeName.horseLamp },
        children: [],
      },
      {
        path: "/kafka",
        name: routeName.message,
        component: Kafka,
        hidden: 0,
        key: 13,
        iconCls: "el-icon-help",
        meta: { title: routeName.message },
        children: [],
      },
      {
        path: "/arrangement",
        name: routeName.layout,
        component: Arrangement,
        hidden: 0,
        key: 14,
        iconCls: "el-icon-help",
        meta: { title: routeName.layout },
        children: [],
      },
      {
        path: "/fileUpload",
        name: routeName.fileUpload,
        component: FileUpload,
        hidden: 0,
        key: 15,
        iconCls: "el-icon-help",
        meta: { title: routeName.fileUpload },
        children: [],
      },
      {
        path: "/accordion",
        name: routeName.accordion ,
        component: Accordion,
        hidden: 0,
        key: 16,
        iconCls: "el-icon-help",
        meta: { title: routeName.accordion },
        children: [],
      },
      {
        path: "/drawer",
        name:routeName.drawer,
        component: Drawer,
        hidden: 0,
        key: 17,
        iconCls: "el-icon-help",
        meta: { title: routeName.drawer },
        children: [],
      },
      {
        path: "/jointJs",
        name: routeName.jointJs,
        component: jointJs,
        hidden: 0,
        key: 18,
        iconCls: "el-icon-help",
        meta: { title: routeName.jointJs },
        children: [
          {
            path: "/jointJsHello",
            name: routeName.jointJsHelloWorld,
            component: jointJsHello,
            hidden: 0,
            key: 19,
            iconCls: "el-icon-help",
            meta: { title: routeName.jointJsHelloWorld },
            children: [],
          },
          {
            path: "/jointJsElement",
            name: routeName.jointJsElement,
            component: jointJsElement,
            hidden: 0,
            key: 20,
            iconCls: "el-icon-help",
            meta: { title: routeName.jointJsElement },
            children: [],
          },
          {
            path: "/jointJsLink",
            name: routeName.jointJsLink,
            component: jointJsLink,
            hidden: 0,
            key: 21,
            iconCls: "el-icon-help",
            meta: { title: routeName.jointJsLink },
            children: [],
          },
        ],
      },
      {
        path: "/mxGraph",
        name: routeName.mxGraph ,
        component: MxGraph,
        hidden: 0,
        key: 22,
        iconCls: "el-icon-help",
        meta: { title: routeName.mxGraph  },
        children: [
          {
            path: "/mxGraphBasic",
            name: routeName.mxGraphBasic,
            component: MxGraphBasic,
            hidden: 0,
            key: 23,
            iconCls: "el-icon-help",
            meta: { title: routeName.mxGraphBasic },
            children: [],
          },
          {
            path: "/mxGraphToolBar",
            name: routeName.mxGraphToolBar,
            component: MxGraphToolBar,
            hidden: 0,
            key: 24,
            iconCls: "el-icon-help",
            meta: { title: routeName.mxGraphToolBar },
            children: [],
          }
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: defaultRouter,
});

export default router;
export { defaultRouter, addRouter };
