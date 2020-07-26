<template>
  <b-form class="campaign-form" @submit.prevent="submitComposeForm" autocomplete="off">
    <div class="edit-campaign">
      <b-container class="edit-campaign__block">
        <base-page-loader v-if="pageLoaderOn" customClass="edit-campaign__block--page-preloader" />
        <b-row class="edit-campaign__block__form">
          <b-col cols="4">
            <div class="edit-campaign__block__form__upload-image">
              <div class="edit-campaign__block__form__upload-image__image-block">
                <img
                  v-if="imgPreviewUrl"
                  class="edit-campaign__block__form__upload-image__image-block--preview"
                  :src="imgPreviewUrl"
                  alt="image preview"
                />

                <input
                  type="file"
                  accept="image/*"
                  class="edit-campaign__block__form__upload-image__image-block--file-filed"
                  @change="onFileChange"
                />

                <b-icon-cloud-upload
                  font-scale="3"
                  class="edit-campaign__block__form__upload-image__image-block--icon"
                />

                <p
                  class="edit-campaign__block__form__upload-image__image-block--text"
                >Upload your pic in JPG or PNG formats</p>
              </div>
              <p
                class="edit-campaign__block__form__upload-image--text"
              >Max. file size 500kb. ratio 1x1 format</p>
            </div>
          </b-col>
          <b-col cols="5">
            <autocomplete-input
              :list="campaignsList"
              v-model="form.title"
              @selectItem="selectCampaign"
            />

            <b-form-group id="input-group-text">
              <b-form-textarea
                class="edit-campaign__block__form--field edit-campaign__block__form--text-filed"
                v-model="form.text"
                required
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-url" class="filed-wrap">
              <span class="filed-label">optional</span>
              <b-form-input
                class="edit-campaign__block__form--field edit-campaign__block__form--url-filed"
                id="input-url"
                v-model="form.url"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="between" class="edit-campaign__block__actions">
          <b-col class="edit-campaign__block__actions--btn-wrap" cols="2">
            <router-link :to="{ name: 'dashboard' }">
              <base-button
                class="edit-campaign__block__actions--btn add-campaign__block__actions--cancel"
                inverted
              >Cancel</base-button>
            </router-link>
          </b-col>
          <b-col class="edit-campaign__block__actions--btn-wrap" cols="2">
            <base-button
              type="submit"
              class="edit-campaign__block__actions--btn edit-campaign__block__actions--save"
            >
              Save
              <transition name="fade">
                <b-spinner v-if="preloaderOn" class="loader" small></b-spinner>
              </transition>
            </base-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { BIconCloudUpload } from "bootstrap-vue";
import AutocompleteInput from "@/components/AutocompleteInput.vue";

export default {
  name: "EditCampaign",

  metaInfo() {
    return {
      title: this.$title("Edit Campaign"),
    };
  },

  components: {
    BIconCloudUpload,
    AutocompleteInput,
  },

  data: () => ({
    imgPreviewUrl: null,
    form: {
      img: null,
      title: "",
      text: null,
      url: null,
    },
    pageLoaderOn: true,
    preloaderOn: false,
    campaign: null,
    campaignsEndpoint: "https://search.crossprom.com/campaigns",
    campaignsList: [],
  }),

  created() {
    this.launchRouteGuard();
  },

  methods: {
    ...mapActions("campaigns", ["editCampaign", "fetchCampaignByKey"]),

    async launchRouteGuard() {
      if (this.$route.params.id) {
        const campaign = await this.fetchCampaignByKey(this.$route.params.id);
        await this.fetchCampaignsForSearch();

        if (campaign) {
          this.campaign = campaign;
          this.setupData();
        } else {
          this.$router.push({ name: "dashboard" });
        }
      } else {
        this.$router.push({ name: "dashboard" });
      }
    },

    async fetchCampaignsForSearch() {
      try {
        const campaigns = (await axios(this.campaignsEndpoint)).data.campaigns
          .mappings.properties;

        this.campaignsList = Object.keys(campaigns);
      } catch (e) {
        console.error("Campaigns Fetch Error:", e);
      }
    },

    selectCampaign(value) {
      this.form.title = value;
    },

    async setupData() {
      this.campaign.key = this.$route.params.id;
      this.imgPreviewUrl = this.campaign.imgURL;
      this.form.title = this.campaign.title;
      this.form.text = this.campaign.text;
      this.form.url = this.campaign.url;

      this.pageLoaderOn = false;
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.imgPreviewUrl = URL.createObjectURL(file);
        this.form.img = file;
      }
    },

    async submitComposeForm() {
      const formData = {
        img: this.form.img,
        title: this.form.title,
        text: this.form.text,
        url: this.form.url,
        campaignId: this.campaign.campaignId,
        imgURL: this.campaign.imgURL,
        key: this.campaign.key,
      };

      this.preloaderOn = true;

      try {
        await this.editCampaign(formData);
        this.$router.push({ name: "dashboard" });
      } catch (e) {
        console.error("Add Campaign Error", e);
      } finally {
        this.preloaderOn = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/views/_composeCampaign.scss";
</style>