<template>
  <v-app id="app">
    <v-toolbar dense>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!this.$store.getters.isAuthenticated" to="/login" flat>Login</v-btn>
        <v-btn v-if="!this.$store.getters.isAuthenticated" to="/register" flat>Register</v-btn>
        <v-btn v-if="this.$store.getters.isAuthenticated" to="/" flat>Home</v-btn>
        <v-btn to="/about" flat>About</v-btn>
        <v-btn v-if="this.$store.getters.isAuthenticated" @click="logout" flat>Logout</v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>
import axios from 'axios'
import { AUTH_LOGOUT } from './store/actions/authentication'

export default {
  created() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT)
          // you can also redirect to /login if needed !
        }

        throw err
      })
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
