import instance from 'utils/request.js'

//获取验证码
const GetSms = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/getSms/',
        data
    }))
}

//登录
const loginIn = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/login/',
        data
    }))
}


//注册
const registers = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/register/',
        data
    }))
}
export { GetSms, loginIn, registers }
