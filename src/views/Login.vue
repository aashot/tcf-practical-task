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

        <base-button class="auth-block__form--submit-btn">
          Login
          <transition name="fade">
            <b-spinner v-if="preloaderOn" class="loader" small></b-spinner>
          </transition>
        </base-button>
      </b-form>

      <p class="auth-block__form--switch-from">
        <router-link :to="{ name: 'signup' }">Create new Account</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase/app";
import BasePasswordInput from "@/components/elements/BasePasswordInput.vue";

export default {
  name: "Login",
  props: {
    requiresUserEmailVerification: Boolean,
  },

  metaInfo() {
    return {
      title: this.$title("Login"),
    };
  },

  components: {
    BasePasswordInput,
  },

  data: () => ({
    email: null,
    password: null,
    preloaderOn: false,
  }),

  computed: {
    ...mapState({
      error: (state) => state.error,
    }),

    isUserEmailVerified() {
      return firebase.auth().currentUser.emailVerified;
    },
  },

  watch: {
    error(fbError) {
      console.log(fbError);
      this.$bvToast.toast(fbError.message || "Something went wrong!", {
        title: "Login Error",
        autoHideDelay: 5000,
        appendToast: false,
        variant: "danger",
      });
    },
  },

  created() {
    if (this.requiresUserEmailVerification) {
      this.$bvToast.toast("Now, please verify your email and login!", {
        title: "Success!",
        autoHideDelay: 5000,
        appendToast: false,
        variant: "success",
      });
    }
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async submitLoginForm() {
      this.preloaderOn = true;

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(formData);
        if (this.isUserEmailVerified) {
          this.$router.push({ name: "dashboard" });
        } else {
          this.$bvToast.toast("Please verify your email!", {
            title: "Warning!",
            autoHideDelay: 5000,
            appendToast: false,
            variant: "warning",
          });
        }
      } catch (e) {
        console.error("Login Error:", e);
      } finally {
        this.preloaderOn = false;
      }
    },
  },
};
</script>