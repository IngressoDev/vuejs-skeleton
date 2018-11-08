import axios from 'axios'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from '../actions/authentication'

const authentication = {
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  state: {
    token: localStorage.getItem('user-token') || '',
    status: ''
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    AUTH_ERROR: state => {
      state.status = 'error'
    },
    AUTH_LOGOUT: state => {
      state.token = ''
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit(AUTH_REQUEST)

        axios({ url: 'http://localhost:3000/api/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            commit(AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {

        const token = localStorage.getItem('user-token')

        if (token) {
          axios.defaults.headers.common['Authorization'] = token
        }

        axios({ url: 'http://localhost:3000/api/logout', method: 'GET' })
          .then(resp => {
            const isLoggedOut = resp.data.logout

            if (isLoggedOut) {
              commit(AUTH_LOGOUT)
              localStorage.removeItem('user-token') // clear your user's token from localstorage
              resolve('/')
            }
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    }
  }
}

export default authentication
