import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'UserHome',
    component: () => import('../views/UserHome.vue')
  },
  {
    path: '/guests',
    name: 'Guests',
    component: () => import('../views/Guests.vue')
  },
  {
    path: '/create_guest',
    name: 'CreateGuest',
    component: () => import('../views/CreateGuest.vue')
  },
  {
    path: '/update_guest/:id',
    name: 'UpdateGuest',
    component: () => import('../views/UpdateGuest.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('../views/Groups.vue')
  },
  {
    path: '/update_group/:id',
    name: 'UpdateGroup',
    component: () => import('../views/UpdateGroup.vue')
  },
  {
    path: '/create_group',
    name: 'CreateGroup',
    component: () => import('../views/CreateGroup.vue')
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/Alerts.vue')
  },
  {
    path: '/create_alert',
    name: 'CreateAlert',
    component: () => import('../views/CreateAlert.vue')
  },
  {
    path: '/update_alert/:id',
    name: 'UpdateAlert',
    component: () => import('../views/UpdateAlert.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
