<template>
  <div class="dashboard">
    <button class="dashboard--logout-btn" @click="handleLogout">Logout</button>
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