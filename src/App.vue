<template>
  <div id="app" class="d-flex">
    <navigation />
    <main class="d-flex justify-content-center align-items-center align-self-center">
      <router-view />
    </main>
  </div>
</template>

<script>
import "./assets/styles/main.scss"
import navigation from "./components/navigation"

export default {
  name: 'App',
  components: {
    navigation,
  },
  methods: {
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
