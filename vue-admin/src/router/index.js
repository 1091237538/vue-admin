import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('views/Login/login.vue')
const Console = () => import('views/Console/index.vue')
const infoClass = () => import('views/Info/infoClass.vue');
const infoList = () => import('views/Info/infoList.vue');
const consoleIndex = () => import('views/Console/consoleIndex.vue')
const userList = () => import('views/User/index.vue')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: login,
  },
  {
    name: 'Console',
    path: '/Console',
    component: Console,
    redirect:'/consoleIndex',
    children: [
      {
        name: 'consoleIndex',
        path: '/consoleIndex',
        component: consoleIndex,
      },
      {
        name: 'infoClass',
        path: '/infoClass',
        component: infoClass
      },
      {
        name: 'infoList',
        path: '/infoList',
        component: infoList
      },
      {
        name: 'userList',
        path: '/userList',
        component: userList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
