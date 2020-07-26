<template>
  <b-form class="campaign-form" @submit.prevent="submitComposeForm" autocomplete="off">
    <div class="add-campaign">
      <b-container class="add-campaign__block">
        <b-row>
          <b-col cols="12">
            <h4 class="add-campaign__block--title">Add cross-promotion information</h4>
            <p
              class="add-campaign__block--text"
            >Add cross-promotion information that your partner campaigns are to post in their updates. You can always edit this information to adjust it to your needs.</p>
          </b-col>
        </b-row>
        <b-row class="add-campaign__block__form">
          <b-col cols="4">
            <div class="add-campaign__block__form__upload-image">
              <div class="add-campaign__block__form__upload-image__image-block">
                <img
                  v-if="imgPreviewUrl"
                  class="add-campaign__block__form__upload-image__image-block--preview"
                  :src="imgPreviewUrl"
                  alt="image preview"
                />

                <input
                  type="file"
                  accept="image/*"
                  class="add-campaign__block__form__upload-image__image-block--file-filed"
                  @change="onFileChange"
                />

                <b-icon-cloud-upload
                  font-scale="3"
                  class="add-campaign__block__form__upload-image__image-block--icon"
                />

                <p
                  class="add-campaign__block__form__upload-image__image-block--text"
                >Upload your pic in JPG or PNG formats</p>
              </div>
              <p
                class="add-campaign__block__form__upload-image--text"
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
                class="add-campaign__block__form--field add-campaign__block__form--text-filed"
                v-model="form.text"
                required
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-url" class="filed-wrap">
              <span class="filed-label">optional</span>
              <b-form-input
                class="add-campaign__block__form--field add-campaign__block__form--url-filed"
                id="input-url"
                v-model="form.url"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="between" class="add-campaign__block__actions">
          <b-col class="add-campaign__block__actions--btn-wrap" cols="2">
            <router-link :to="{ name: 'dashboard' }">
              <base-button
                class="add-campaign__block__actions--btn add-campaign__block__actions--cancel"
                inverted
              >Cancel</base-button>
            </router-link>
          </b-col>
          <b-col class="add-campaign__block__actions--btn-wrap" cols="2">
            <base-button
              class="add-campaign__block__actions--btn add-campaign__block__actions--save"
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
  name: "AddCampaign",

  metaInfo() {
    return {
      title: this.$title("Add Campaign"),
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
    preloaderOn: false,
    prevRoute: null,
    campaignsEndpoint: "https://search.crossprom.com/campaigns",
    campaignsList: [],
  }),

  created() {
    this.fetchCampaignsForSearch();
  },

  methods: {
    ...mapActions("campaigns", ["addCampaign"]),

    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.imgPreviewUrl = URL.createObjectURL(file);
        this.form.img = file;
      }
    },

    async submitComposeForm() {
      const campaignId = Math.random().toString(36).substr(2, 9);

      const formData = {
        img: this.form.img,
        title: this.form.title,
        text: this.form.text,
        url: this.form.url,
        campaignId,
      };

      this.preloaderOn = true;

      try {
        await this.addCampaign(formData);
        this.$router.push({ name: "dashboard" });
      } catch (e) {
        console.error("Add Campaign Error", e);
      } finally {
        this.preloaderOn = false;
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
  },
};
</script>

<style lang="scss">
@import "@/scss/views/_composeCampaign.scss";
</style>