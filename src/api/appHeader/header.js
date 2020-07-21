import request from "@/utils/request.js"
import Qs from 'qs'

export default {
    fetchModuleList(){
        return request({
            url:`/routerModule/list`,
            method:'get',
        })
    },
    fetchMenuList(moduleId){
        return request({
            url:`/routerModule/list?moduleId=`+moduleId,
            method:'get',
        })
    }
}