<template>
  <div class="singup">
    <div class="auth-block">
      <h5 class="auth-block--title">Sign Up</h5>
      <p class="auth-block--text">New to CrossProm?</p>
      <b-form @submit.prevent="submitSignUpForm" class="auth-block__form">
        <p class="auth-block--text">Create an account! It won't take long.</p>

        <b-form-group id="input-group-name">
          <b-form-input
            id="input-name"
            v-model="name"
            type="text"
            required
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>

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

        <base-button type="submit" class="auth-block__form--submit-btn">
          Sign Up
          <transition name="fade">
            <b-spinner v-if="preloaderOn" class="loader" small></b-spinner>
          </transition>
        </base-button>
      </b-form>

      <p class="auth-block--text">
        By clicking Sign Up you accept
        <a href="#" class="auth-block--link">Terms and Conditions</a>
      </p>

      <p class="auth-block__form--switch-from">
        <router-link :to="{ name: 'login' }">Already have an account?</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import BasePasswordInput from "@/components/elements/BasePasswordInput.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "SingUp",

  components: {
    BasePasswordInput
  },

  data: () => ({
    name: null,
    email: null,
    password: null,
    preloaderOn: false
  }),

  computed: {
    ...mapState({
      error: state => state.error
    })
  },

  watch: {
    error(fbError) {
      console.log(fbError);
      this.$bvToast.toast(fbError.message || "Something went wrong!", {
        title: "Sing Up Error",
        autoHideDelay: 5000,
        appendToast: false,
        variant: "danger"
      });
    }
  },

  methods: {
    ...mapActions("auth", ["signup"]),

    async submitSignUpForm() {
      this.preloaderOn = true;

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        await this.signup(formData);

        setTimeout(() => {
          this.$router.push({
            name: "login",
            params: { requiresUserEmailVerification: true }
          });
        }, 200);
      } catch (e) {
        console.error("Sign Up Error:", e);
      } finally {
        this.preloaderOn = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/components/_AuthForm.scss";
</style>