<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" :rules="[rules.required]" label="E-mail" required></v-text-field>
          <v-text-field type="password" v-model="password" :rules="[rules.required, rules.length]" label="Password" required></v-text-field>
          <v-btn type="submit" autofocus>Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: v => !!v || 'Required',
        length: v => v.length >= 8 || 'Mindestens 8 Zeichen'
      }
    }
  },
  methods: {
    login() {
      const { email, password } = this
      this.$store.dispatch('AUTH_REQUEST', { email, password }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
</style>
