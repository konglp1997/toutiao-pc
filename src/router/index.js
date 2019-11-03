import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import NotFound from '../views/404'
import local from '@/utils/local'
import Article from '@/views/article/article.vue'
import Image from '@/views/image'
import Publish from '@/views/publish/publish.vue'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        component: Welcome
      }, {
        path: '/article',
        component: Article
      }, {
        path: '/image',
        component: Image
      }, {
        path: '/publish',
        component: Publish
      }]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = local.getUser()

  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
