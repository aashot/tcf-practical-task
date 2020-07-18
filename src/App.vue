<template>
  <div id="app">
    <b-container class="view-container" :class="{ 'theme-white': user }" fluid>
      <b-row>
        <b-col cols="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase/app";

export default {
  name: "App",

  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  created() {
    this.setCurrentUser();
  },

  methods: {
    ...mapMutations(["SET_CURRENT_USER"]),

    setCurrentUser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user && user.emailVerified) {
          this.SET_CURRENT_USER(user);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/components/_main.scss";
</style>
