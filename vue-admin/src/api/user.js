import instance from 'utils/request.js'

//获取用户列表
const getAllUser = data => {
    return Promise.resolve(instance.request({
        method: 'post',
        url: '/user/getList/',
        data
    }))
}

//用户添加

const addUser = data => {
    return Promise.resolve(instance.request({
        method: 'post',
        url: "/user/add/",
        data
    }))
}

//获取地区信息
const getReginInfo = data => {
    return Promise.resolve(instance.request({
        method: 'post',
        url: "/cityPicker/",
        data
    }))
}


//用户删除
const deleteUser = data =>{
    return Promise.resolve(instance.request({
        method:'post',
        url:"/user/delete/",
        data
    }))
}

//用户编辑
const editUser = data=>{
    return Promise.resolve(instance.requese({
        method:"post",
        url:"/user/edit/",
        data
    }))
}
export { getAllUser, addUser,getReginInfo,deleteUser,editUser } 