<template>
  <div class="dashboard">
    <base-page-loader v-if="!campaigns.length" />
    <div v-else class="dashboard__campaings-list">
      <campaign-card
        v-for="(campaign, campaignIndex) of campaigns"
        :key="campaignIndex"
        :params="campaign"
        @deleteAction="openConfirmationModal"
      />
    </div>

    <b-modal
      id="deleteCampaign"
      size="sm"
      class="dashboard__delete-campaign-modal"
      title="Are you sure?"
      hide-footer
    >
      <div class="dashboard__delete-campaign-modal__actions">
        <base-button
          class="dashboard__delete-campaign-modal__actions--btn"
          @click.native="closeDeleteCampaignModal"
          inverted
        >Cancel</base-button>
        <base-button
          class="dashboard__delete-campaign-modal__actions--btn"
          @click.native="deleteCampaign"
        >Yes</base-button>
      </div>
    </b-modal>
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
    ...mapActions("campaigns", ["fetchCampaigns"]),

    closeDeleteCampaignModal() {
      this.$bvModal.hide("deleteCampaign");
    },

    openConfirmationModal() {
      this.$bvModal.show("deleteCampaign");
    },

    deleteCampaign() {
      this.$bvModal.hide("deleteCampaign");
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>