import instance from 'utils/request.js'


//获取分类信息
const getCategory = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/news/getCategory/',
        data
    }))
}


//删除分类
const deleteCategory = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/news/deleteCategory/',
        data
    }))
}

//修改分类信息

const modifyCategory = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/news/editCategory/',
        data
    }))
}



//添加一级分类
const AddFirstCategory = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/news/addFirstCategory/',
        data
    }))
}

//添加二级分类
const AddSecondCategory = (data) => {
    return Promise.resolve(instance.request({
        method: "post",
        url: '/news/addChildrenCategory/',
        data
    }))
}

export { AddFirstCategory, getCategory, deleteCategory, modifyCategory,AddSecondCategory }