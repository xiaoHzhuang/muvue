import zhLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
  routeName: {
    login:'登录',
    home: "主页",
    staff: "员工管理",
    supplier: "供应商管理",
    goods: "商品管理",
    member: "会员管理",
    sidesShow: "轮播图",
    task: "任务调度",
    taskManage: "任务管理",
    horseLamp: "走马灯",
    message: "消息中间件",
    layout: "layout布局",
    fileUpload: "文件上传",
    accordion: "手风琴",
    drawer: "drawer",
    jointJs: "jointJs",
    jointJsHelloWorld: "jointJsHelloWorld",
    jointJsElement: "jointJsElement",
    jointJsLink: "jointJsLink",
    mxGraph: "mxGraph",
    mxGraphBasic: "mxGraphBasic",
    mxGraphToolBar: "mxGraphToolBar",
  },

  leftHeaderContainer: {
    appName: "管理系统",
  },
  ...zhLocale, //  合并element-ui内置翻译
};

export default cn;
