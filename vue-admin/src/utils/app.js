import cookie from 'js-cookie'

const userToken = 'user_token'
const userName = 'username'

//token信息
export function getToken() {
    return cookie.get(userToken)
}
export function setToken(value) {
    return cookie.set(userToken, value)
}
export function removeToken() {
    cookie.remove(userToken)
}

//用户信息
export function setUserName(val) {
    return cookie.set(userName, val)
}
export function getUserName() {
    return cookie.get(userName)
}
export function removeUserName() {
    cookie.remove(userName)
}