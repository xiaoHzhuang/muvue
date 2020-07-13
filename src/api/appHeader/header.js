import request from "@/utils/request.js"
import Qs from 'qs'

export default {
    fetchModuleList(){
        return request({
            url:`/goods/list/search`,
            method:'get',
        })
    }
}