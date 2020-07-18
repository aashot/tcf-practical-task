<template>
  <div class="dashboard">
    <nav class="dashboard__nav">
      <base-button class="dashboard__nav--btn">Create</base-button>
      <base-button
        class="dashboard__nav--btn dashboard__nav--logout-btn"
        @click.native="handleLogout"
        inverted
      >Logout</base-button>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "dashboard",

  methods: {
    ...mapActions("auth", ["logout"]),

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