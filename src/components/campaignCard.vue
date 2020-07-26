<template>
  <div class="campaigns-card">
    <div class="campaigns-card__cover" :style="`background-image: url('${params.imgURL}')`">
      <div class="campaigns-card__cover__info">
        <div class="campaigns-card__cover__info__left-block">
          <span class="campaigns-card__cover__info__left-block--text">backers</span>
          <p class="campaigns-card__cover__info__left-block--numbers">29,441</p>
        </div>

        <div class="campaigns-card__cover__info__right-block">
          <div class="campaigns-card__cover__info__right-block--tag">InDemand</div>
          <img
            class="campaigns-card__cover__info__right-block--label"
            src="@/assets/icons/label.svg"
            alt="card label"
          />
        </div>
      </div>
    </div>

    <div class="campaigns-card__info">
      <p class="campaigns-card__info--title">{{ params.title }}</p>
      <p class="campaigns-card__info--author">By John Smith</p>
      <p class="campaigns-card__info--text">{{ params.text }}</p>
    </div>

    <div class="campaigns-card__actions">
      <router-link :to="{ name: 'edit-campaign', params: { id: params.key } }">
        <div class="campaigns-card__actions--btn">
          <img src="@/assets/icons/edit.svg" alt="edit icon" />
        </div>
      </router-link>
      <div class="campaigns-card__actions--btn" @click="$emit('deleteAction')">
        <img src="@/assets/icons/trash.svg" alt="delete icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CampaignCard",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/_CampaignCard.scss";
</style>