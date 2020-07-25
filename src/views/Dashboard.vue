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
import { mapActions, mapState } from "vuex";
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
    await this.fetchCampaigns();
  },

  methods: {
    ...mapActions("campaigns", ["fetchCampaigns"])
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>