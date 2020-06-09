import request from "@/utils/request.js"
import Qs from 'qs'

export default {
    saveGoods(data){
        return request({
            url:`/goods/save`,
            method:'post',
            data:data
        })
    },
    getList:function(pageNum,pageSize,searchMap) {
        return request({
            url:`/goods/list/search/${pageNum}/${pageSize}`,
            method:'post',
            data:Qs.stringify(searchMap)
        })
    },
    deleteById(id){
        return request({
            url:`/goods/detete/${id}`,
            method:'get',
        })
    },
    getById(id){
        return request({
            url:`/goods/get/${id}`,
            method:'get',
        })
    },
}