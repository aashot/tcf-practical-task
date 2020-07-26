<template>
  <div id="app">
    <b-container class="view-container" fluid>
      <b-row>
        <b-col cols="12">
          <navbar v-if="user && user.emailVerified" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import firebase from "firebase/app";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",

  components: {
    Navbar,
  },

  computed: {
    ...mapState({
      theme: (state) => state.theme,
      user: (state) => state.user,
    }),
  },

  created() {
    this.setCurrentUser();
  },

  methods: {
    ...mapMutations(["SET_CURRENT_USER"]),

    setCurrentUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          this.SET_CURRENT_USER(user);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/_main.scss";
</style>
