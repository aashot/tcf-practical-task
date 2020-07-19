<template>
  <div class="add-campaign"></div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AddCampaign",

  created() {
    this.SET_THEME_BLUE();
  },

  methods: {
    ...mapMutations(["SET_THEME_BLUE"])
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_AddCampaign.scss";
</style>