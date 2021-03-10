import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Holdings from './components/holdings'
import SingleHolding from './components/holdings/single'
import Venues from './components/venues'
import Clients from './components/clients'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/propiedades',
      name: 'Holdings',
      component: Holdings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/propiedad/:id',
      name: 'Single Holding',
      component: SingleHolding,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sucursales',
      name: 'Venues',
      component: Venues,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clientes',
      name: 'Clients',
      component: Clients,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
