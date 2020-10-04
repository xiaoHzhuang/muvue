import enLocale from "element-ui/lib/locale/lang/en";
const en = {
  routeName: {
    login:'login',
    home: "home",
    staff: "staff",
    supplier: "supplier",
    goods: "goods",
    member: "member",
    sidesShow: "sidesShow",
    task: "task",
    taskManage: "taskManage",
    horseLamp: "horseLamp",
    message: "message",
    layout: "layout",
    fileUpload: "fileUpload",
    accordion: "accordion",
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
    appName: 'System',
  },
  ...enLocale, //  合并element-ui内置翻译
};

export default en;
