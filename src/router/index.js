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

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/home",
        name: "home",
        component: Home,
        meta:{title:"首页"}
      },
      {
        path: "/staff",
        name: "staff",
        component: Staff,
        meta:{title:"员工管理"}
      },
      {
        path: "/supplier",
        name: "supplier",
        component: Supplier,
        meta:{title:"供应商管理"}
      }, 
      {
        path: "/goods",
        name: "goods",
        component: Goods,
        meta:{title:"商品管理"}
      }
    ]
  },
  {
    path: "/member",
    name: "layout_member",
    component: Layout,
    children: [
      {
        path: "/",
        name: "member",
        component: Member,
        meta:{title:"会员管理"}
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
