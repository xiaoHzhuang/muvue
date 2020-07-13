import request from "@/utils/request.js"

export default {
    registerForm(formData) {
        return request({
            url: `/user/register`,
            method: 'post',
            data: formData
        })
    },
    retrievePwd(userMail) {
        return request({
            url: `/user/pwd/retrieve?mail=` + userMail,
            method: 'get'
        })
    }
}