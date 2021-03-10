import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    holdings: [],
    holding: {},
    venues: [],
    clients: [],
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      localStorage.setItem('token', token)
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    SET_HOLDINGS(state, holdings) {
      state.status = 'success'
      state.holdings = holdings
    },
    SET_SINGLE_HOLDINGS(state, holding) {
      state.status = 'success'
      state.holding = holding
    },
    SET_VENUES(state, venues) {
      state.status = 'success'
      state.venues = venues
    },
    SET_CLIENTS(state, clients) {
      state.status = 'success'
      state.clients = clients
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype.$axios.post('/login', user)
        .then(resp => {
          const token = resp.data.token
          // const user = resp.data.user
          commit('auth_success', token, null)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete Vue.prototype.$axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getHoldings({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype.$axios.get('/holdings')
        .then(response => {
          commit('SET_HOLDINGS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getSingleHolding({commit}, id) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$axios.get(`/holding/${id}`)
        .then(response => {
          commit('SET_SINGLE_HOLDINGS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deleteHolding({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype.$axios.get(`/holding/d/${id}`)
        .then(response => {
          commit('SET_HOLDINGS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getVenues({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype.$axios.get('/venues')
        .then(response => {
          commit('SET_VENUES', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getClients({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype.$axios.get('/clients')
        .then(response => {
          commit('SET_CLIENTS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    allHoldings: state => state.holdings,
    singleHolding: state => state.holding,
    allVenues: state => state.venues,
    allClients: state => state.clients,
  }
})
