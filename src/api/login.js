import request from "@/utils/request.js"

export function login(username,password){
    return request({
        url:'/user/login',
        method:'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:{
            username,
            password
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
    })
}

export function getUserInfo(token){
    return request({
        url:'/user/info?token='+token,
        method:'get'
    })
}

export function logOut(token){
    return request({
        url:'/user/logOut?token='+token,
        method:'post'
    })
}