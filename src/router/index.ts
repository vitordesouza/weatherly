import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import Today from '../views/today/Today.vue'
import Login from '../views/login/Login.vue'

import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: requireAuth,
    component: Today
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/signup/Signup.vue')
  },
  {
    path: '/forecast',
    name: 'Forecast',
    beforeEnter: requireAuth,
    component: () => import('../views/forecast/Forecast.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: requireAuth,
    component: () => import('../views/profile/Profile.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/notfound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function requireAuth (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!store.getters.isAuthenticated) next({ path: '/login' })
  else next()
}
export default router
