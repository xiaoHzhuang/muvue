import request from "@/utils/request.js"
import Qs from 'qs'

export default {
    uploadFile(data){
        return request({
            url:`/file/upload`,
            method:'post',
            data:data
        })
    }
}