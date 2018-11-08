import Vue from 'vue'
import Router from 'vue-router'

import Store from './store/store'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (Store.getters.isAuthenticated) {
    next()
    return
  }

  next('/login')
}

const isGuest = (to, from, next) => {
  if (!Store.getters.isAuthenticated) {
    next()
    return
  }

  next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: isAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isGuest
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: isGuest
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
