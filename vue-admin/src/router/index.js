import Vue from 'vue'
import VueRouter from 'vue-router'
const login = ()=> import('views/Login/login.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
