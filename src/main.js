import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'https://agile-forest-99854.herokuapp.com/api'
})

new Vue({
  router,
  store,
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('auth_success', token, null)
    }
    Vue.prototype.$axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App),
}).$mount('#app')


Vue.component('my-component', {/* options */})


new Vue({/* options */})
