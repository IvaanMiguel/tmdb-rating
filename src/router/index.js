import { createRouter, createWebHistory } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      components: {
        navbar: Navbar,
        default: Home
      }
    }
  ]
})

export default router
