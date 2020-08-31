import request from "@/utils/request.js"
import Qs from 'qs'

export default {

    sendMsg(msg){
        return request({
            url:`/kafkaProducer/normal/${msg}`,
            method:'get',
        })
    },
}