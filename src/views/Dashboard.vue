<template>
  <div class="dashboard"></div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "dashboard",

  async created() {
    this.SET_THEME_WHITE();
    await this.fetchCampaigns();
  },

  methods: {
    ...mapMutations(["SET_THEME_WHITE"]),
    ...mapActions("campaigns", ["fetchCampaigns"])
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>