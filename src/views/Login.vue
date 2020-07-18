<template>
  <div class="login">
    <div class="auth-block">
      <h5 class="auth-block--title">Login</h5>
      <b-form @submit.prevent="submitLoginForm" class="auth-block__form">
        <b-form-group id="input-group-email">
          <b-form-input
            id="input-email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
          ></b-form-input>
        </b-form-group>

        <base-password-input v-model="password" />

        <p class="auth-block--link auth-block__form--forgot-password">
          <a href="#">Forgot password?</a>
        </p>

        <base-button class="auth-block__form--submit-btn">Login</base-button>
      </b-form>

      <p class="auth-block__form--switch-from">
        <router-link :to="{ name: 'signup' }">Create new Account</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import BasePasswordInput from "@/components/elements/BasePasswordInput.vue";

export default {
  name: "Login",

  components: {
    BasePasswordInput
  },

  data: () => ({ email: null, password: null }),

  methods: {
    submitLoginForm() {}
  }
};
</script>