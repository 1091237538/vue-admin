import router from './index'
import { getToken } from 'utils/app.js'
import { removeToken, removeUserName } from "utils/app.js";
const whiteRouter = ['/login'] //白名单
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            removeToken()
            removeUserName()
            this.$store.commit("login/logout");
            next()
        } else {
            next()
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})