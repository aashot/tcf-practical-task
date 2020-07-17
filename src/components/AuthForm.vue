<template>
  <div class="auth-block">
    <h5 class="auth-block--title">Sign Up</h5>
    <span class="auth-block--text">New to CrossProm?</span>
    <b-form @submit="submitAuthForm" class="auth-block__form">
      <span class="auth-block__form--title">Create an account! It won't take long.</span>

      <b-form-group id="input-group-name">
        <b-form-input id="input-name" type="text" required placeholder="Enter your name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-email">
        <b-form-input id="input-email" type="email" required placeholder="Enter your email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password">
        <b-form-input
          id="input-password"
          type="password"
          required
          placeholder="Enter your password"
        ></b-form-input>
      </b-form-group>

      <base-button :name="'Sign Up'" />
    </b-form>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  methods: {
    submitAuthForm() {}
  }
};
</script>

<style lang="scss">
@import "@/scss/components/AuthForm.scss";
</style>