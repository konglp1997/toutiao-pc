import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login'
import Home from '../views/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login',
      component: Login },
    {
      path: '/',
      component: Home
    }
  ]
})

export default router
