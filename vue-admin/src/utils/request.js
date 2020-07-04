import axios from 'axios'

//创建axios实例
const BASEURL = process.env.NODE_ENV === "production" ? " " : "/devapi";  // 判断是生产环境的地址还是开发环境的地址
const instance = axios.create({
    baseURL: BASEURL,
    timeout: 1000
})


instance.interceptors.request.use(data => {
    return data
})

instance.interceptors.response.use(data => {
   return data.data
})


export default instance