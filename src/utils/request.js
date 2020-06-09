import axios from 'axios'
import { Loading, Message } from 'element-ui';
import Router from '@/router/index'
import axiosRetry from 'axios-retry';

//遮罩效果
const loading={
  loadingInstance:null,//loading实例
  open:function(){
    if(this.loadingInstance===null){
      this.loadingInstance=Loading.service({
        text:'拼命加载中',
        target:'.appMain',
        background:'rgba(0,0,0,0.5)'
      })
    }
  },
  close:function(){//关闭加载
    if(this.loadingInstance!==null){
      this.loadingInstance.close();
    }
    this.loadingInstance=null;
  }
}

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
})

//请求重试机制
axiosRetry(axios, {
   // 设置自动发送请求次数
  retries: 3,
   // 重复请求延迟                      
  retryDelay: (retryCount) => {
    return retryCount * 1000;     
  },
   //  重置超时时间
  shouldResetTimeout: true,      
  retryCondition: (error) => {
    let status=err.response.status;
    if(status==429){
      console.log("请求重试");
      return true;
    }else{
      return false;
    }
  }
});


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  var token = localStorage.getItem('my-vue-token');
   if(token){
    config.headers['Authorization']=token;
   }
   loading.open();
  return config;
}, function (error) {
  loading.close();
  Message({
    meaasge:error.message,
    type:'error',
    duration:5*1000
  })
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  loading.close();
 if(response.headers['authorization']){
  localStorage.setItem('my-vue-token',response.headers['authorization']);
 }
  return response;
}, function (error) {
  loading.close();
  var status=error.response.status;
  if(status==401){
    Router.push("/login");
  }
  return Promise.reject(error);
});

export default request;
