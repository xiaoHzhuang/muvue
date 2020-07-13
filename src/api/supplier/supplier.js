
import request from "@/utils/request.js"
import Qs from 'qs'

export default{
    saveSupplier(data){
        return request({
            url:`/supplier/save`,
            method:'post',
            data:data
        })
    },
    getSupplierList:function(pageNum,pageSize,searchMap) {
        return request({
            url:`/supplier/list/search/${pageNum}/${pageSize}`,
            method:'post',
            data:Qs.stringify(searchMap)
        })
    },
    getSupplierById(id){
        return request({
            url:`/supplier/get/${id}`,
            method:'get',
        })
    },
    deleteById(id){
        return request({
            url:`/supplier/detete/${id}`,
            method:'get',
        })
    }
}