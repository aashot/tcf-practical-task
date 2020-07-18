<template>
  <div class="dashboard">
    <nav class="dashboard__nav">
      <router-link :to="{ name: 'add-campaign' }" class="dashboard__nav__link">
        <base-button class="dashboard__nav--btn">Create</base-button>
      </router-link>
      <base-button
        class="dashboard__nav--btn dashboard__nav--logout-btn"
        @click.native="handleLogout"
        inverted
      >Logout</base-button>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "dashboard",

  created() {
    this.SET_THEME_WHITE();
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapMutations(["SET_THEME_WHITE"]),

    async handleLogout() {
      await this.logout();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>