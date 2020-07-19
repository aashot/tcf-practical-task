<template>
  <nav class="app-navbar">
    <router-link :to="{ name: 'add-campaign' }" v-if="!createBtnVisible" class="app-navbar__link">
      <base-button class="app-navbar--btn">Create</base-button>
    </router-link>
    <base-button
      class="app-navbar--btn app-navbar--logout-btn"
      :class="{ 'color-white': createBtnVisible }"
      @click.native="handleLogout"
      inverted
    >Logout</base-button>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AppNavbar",

  computed: {
    createBtnVisible() {
      return this.$route.meta.layout === "compose-campaign";
    }
  },

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
.app-navbar {
  display: flex;
  justify-content: flex-end;
  padding-top: 41px;

  &__link {
    &:hover {
      text-decoration: none;
    }
  }

  &--btn {
    padding: 16px 55px !important;
  }

  &--logout-btn {
    padding: 0;
  }
}
</style>