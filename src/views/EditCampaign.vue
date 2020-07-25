<template>
  <b-form class="campaign-form" @submit.prevent="submitComposeForm">
    <div class="edit-campaign">
      <b-container class="edit-campaign__block">
        <b-row>
          <b-col cols="12">
            <h4 class="edit-campaign__block--title">Add cross-promotion information</h4>
            <p
              class="edit-campaign__block--text"
            >Add cross-promotion information that your partner campaigns are to post in their updates. You can always edit this information to adjust it to your needs.</p>
          </b-col>
        </b-row>
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
            <b-form-group id="input-group-title" class="filed-wrap">
              <span class="filed-label">Title</span>

              <b-form-input
                class="edit-campaign__block__form--field edit-campaign__block__form--title-filed"
                id="input-title"
                v-model="form.title"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-text">
              <b-form-textarea
                class="edit-campaign__block__form--field edit-campaign__block__form--text-filed"
                v-model="form.text"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-url" class="filed-wrap">
              <span class="filed-label">optional</span>
              <b-form-input
                class="edit-campaign__block__form--field edit-campaign__block__form--url-filed"
                id="input-url"
                v-model="form.url"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="between" class="edit-campaign__block__actions">
          <b-col class="edit-campaign__block__actions--btn-wrap" cols="2">
            <base-button
              class="edit-campaign__block__actions--btn edit-campaign__block__actions--cancel"
              inverted
            >Cancel</base-button>
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
import { mapActions } from "vuex";
import { BIconCloudUpload } from "bootstrap-vue";

export default {
  name: "EditCampaign",

  components: {
    BIconCloudUpload
  },

  data: () => ({
    imgPreviewUrl: null,
    form: {
      img: null,
      title: null,
      text: null,
      url: null
    },
    preloaderOn: false,
    campaign: null
  }),

  created() {
    this.setupData();
  },

  methods: {
    ...mapActions("campaigns", ["editCampaign", "fetchCampaigns"]),

    async setupData() {
      const campaigns = await this.fetchCampaigns();
      this.campaign = campaigns.find(
        item => item.campaignId === this.$route.params.id
      );

      this.imgPreviewUrl = this.campaign.imgURL;
      this.form.title = this.campaign.title;
      this.form.text = this.campaign.text;
      this.form.url = this.campaign.url;
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
        key: this.campaign.key
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
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/views/_composeCampaign.scss";
</style>