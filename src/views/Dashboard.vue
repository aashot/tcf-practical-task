<template>
  <div class="dashboard"></div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "dashboard",

  created() {
    this.SET_THEME_WHITE();
  },

  methods: {
    ...mapMutations(["SET_THEME_WHITE"])
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>