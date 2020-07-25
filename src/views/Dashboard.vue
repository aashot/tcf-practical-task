<template>
  <div class="dashboard">
    <div class="dashboard__campaings-list" v-if="campaigns && campaigns.length">
      <campaign-card
        v-for="(campaign, campaignIndex) of campaigns"
        :key="campaignIndex"
        :params="campaign"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CampaignCard from "@/components/CampaignCard.vue";

export default {
  name: "dashboard",

  components: {
    CampaignCard
  },

  computed: {
    ...mapState({
      campaigns: state => state.campaigns
    })
  },

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