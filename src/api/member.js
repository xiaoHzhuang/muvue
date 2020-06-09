
import request from "@/utils/request.js"
import Qs from 'qs'
export default {
    getMemberList:function() {
        return request({
            url:'/member/getAllMember',
            method:'get'
        })
    },
    //分页查询
    //pageNum当前页码，pageSize每页显示条数，searchMap条件
    search(pageNum,pageSize,searchMap){
        return request({
            url:`/member/list/search/${pageNum}/${pageSize}`,
            method:'post',
            data:Qs.stringify(searchMap)
        })
    },
    saveMember(memberData){
        return request({
            url:`/member/save`,
            method:'post',
            data:memberData
        })
    },
    getMemberById(id){
        return request({
            url:`/member/get/${id}`,
            method:'get',
        })
    },
    deleteById(id){
        return request({
            url:`/member/detete/${id}`,
            method:'get',
        })
    }
}
