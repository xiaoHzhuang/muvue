import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login"
import Layout from "@/components/Layout"
import Home from "@/views/home"
import Member from "@/views/member"
import Staff from "@/views/staff"
import Supplier from "@/views/supplier"
import Goods from "@/views/goods"
Vue.use(VueRouter);

const defaultRouter = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true,
    children: []
  },
  {
    path: "/",
    name: "",
    component: Layout,
    redirect: "/login",
    alone:true,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
        hidden: true,
        children: []
      }]
  },
  {
    path: "/",
    name: "",
    component: Layout,
    alone:true,
    children: [
      {
        path: "/home",
        name: "首页",
        component: Home,
        iconCls: 'el-icon-s-menu',
        meta: { title: "首页" },
        children: []
      },
    ]
  },
  {
    path: "/",
    name: "",
    component: Layout,
    alone:true,
    children: [
      {
        path: "/staff",
        name: "员工管理",
        component: Staff,
        iconCls: 'el-icon-user',
        meta: { title: "员工管理" },
        children: []
      }
    ]
  },
  {
    path: "/",
    name: "",
    component: Layout,
    alone:true,
    children: [
      {
        path: "/supplier",
        name: "供应商管理",
        component: Supplier,
        iconCls: 'el-icon-s-cooperation',
        meta: { title: "供应商管理" },
        children: []
      }
    ]
  },
  {
    path: "/",
    name: "",
    component: Layout,
    alone:true,
    children: [
      {
        path: "/goods",
        name: "商品管理",
        component: Goods,
        iconCls: 'el-icon-s-goods',
        meta: { title: "商品管理" },
        children: []
      }
    ]
  },
  {
    path: "/",
    name: "",
    component: Layout,
    alone:true,
    children: [  
      {
        path: "/member",
        name: "会员管理",
        component: Member,
        iconCls: 'el-icon-user-solid',
        meta: { title: "会员管理" },
        children: []
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: defaultRouter
});

export default router;
export { defaultRouter }