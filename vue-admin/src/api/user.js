import instance from 'utils/request.js'

//获取用户列表
const getAllUser = data => {
    return Promise.resolve(instance.request({
        method: 'post',
        url: '/user/getList/',
        data
    }))
}


export { getAllUser } 