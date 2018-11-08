<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-form lazy-validation>
          <v-text-field v-model="name" :rules="[rules.required, rules.min]" :counter="10" label="Name"></v-text-field>
          <v-text-field type="password" v-model="password" :rules="[rules.required, rules.min]" label="Password" required></v-text-field>
          <v-text-field type="password" v-model="passwordConfirm" :rules="[rules.required, rules.min]" label="Password Comfirm" required></v-text-field>
          <v-text-field v-model="email" :rules="[rules.emailMatch]" label="E-mail" required></v-text-field>
          <v-checkbox v-model="checkbox" :rules="[rules.agree]" label="Do you agree?" required></v-checkbox>
          <v-btn>Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: null,
    password: null,
    passwordConfirm: null,
    email: null,
    checkbox: null,
    rules: {
      required: value => !!value || 'Required.',
      min: v => (v && v.length >= 8) || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match",
      agree: v => !!v || 'You must agree to continue!'
    }
  })
}
</script>

<style scoped>
</style>
