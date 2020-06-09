module.exports={
    devServer:{
        port:8888,//端口号，如果端口号被占用，会自动提升1
        host:"localhost",//主机名，127.0.0.1
        https:false,//协议
        open:true,//启动服务室自动打开浏览器访问
        proxy:{//开发环境代理配置
            //目标服务器地址，代理访问http://localhost
            [process.env.VUE_APP_BASE_API]:{
                target:process.env.VUE_APP_SERVICE_URL,//在.env.development中配置的
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
                //并同时接受请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changeOrigin:true,//开启代理服务器
                pathRewrite:{
                    // /dev-api/db.json 最终会发送http://localhost:8001/db.json
                    // '^/dev-api':''
                    ['^'+process.env.VUE_APP_BASE_API]:''
                }
            }
        }
    },
    lintOnSave:false,//关闭格式检查
    productionSourceMap:false,//打包时不会生成.map文件，加快打包速度
}