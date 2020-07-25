<template>
  <div class="dashboard">
    <base-page-loader v-if="pageLoaderOn" />
    <div v-else class="dashboard__campaings-list">
      <campaign-card
        v-for="(campaign, campaignIndex) of campaigns"
        :key="campaignIndex"
        :params="campaign"
        @deleteAction="openConfirmationModal(campaign)"
      />
    </div>

    <h4 class="text-center" v-if="!pageLoaderOn && !campaigns.length">No campaigns created</h4>

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
          @click.native="deleteCampaignHandler"
        >
          Yes
          <transition name="fade">
            <b-spinner v-if="preloaderOn" class="loader" small></b-spinner>
          </transition>
        </base-button>
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

  data() {
    return {
      selectedCampaignToDelete: null,
      preloaderOn: false,
      pageLoaderOn: true
    };
  },

  async created() {
    await this.fetchCampaigns();
    this.pageLoaderOn = false;
  },

  methods: {
    ...mapActions("campaigns", ["fetchCampaigns", "deleteCampaign"]),

    closeDeleteCampaignModal() {
      this.$bvModal.hide("deleteCampaign");
    },

    openConfirmationModal(campaign) {
      this.selectedCampaignToDelete = campaign;
      this.$bvModal.show("deleteCampaign");
    },

    async deleteCampaignHandler() {
      this.preloaderOn = true;
      try {
        await this.deleteCampaign(this.selectedCampaignToDelete);
      } catch (e) {
        console.error("Campaign Deleting Error", e);
      } finally {
        this.refreshBoardData();
      }
    },

    async refreshBoardData() {
      this.preloaderOn = true;
      try {
        await this.fetchCampaigns();
      } catch (e) {
        console.error("Dashboard Refreshing Error", e);
      } finally {
        this.preloaderOn = false;
        this.$bvModal.hide("deleteCampaign");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_Dashboard.scss";
</style>