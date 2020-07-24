import instance from 'utils/request.js'

//获取信息列表

const getInfoList = (data) => {
    return Promise.resolve(instance.request({
        method: "POST",
        url: "/news/getList/",
        data
    }))
}

//添加信息
const addInfo = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: "/news/add/",
        data
    }))
}

//删除信息
const deleteInfo = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    }))
}


export { getInfoList, addInfo, deleteInfo }