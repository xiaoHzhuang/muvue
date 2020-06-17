import request from "@/utils/request.js"

export default{
    registerForm(formData){
        return request({
            url:`/user/register`,
            method:'post',
            data:formData
        })
    }
}