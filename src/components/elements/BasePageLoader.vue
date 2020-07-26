<template>
  <div class="base-page-lader" :class="customClass">
    <b-spinner></b-spinner>
  </div>
</template>

<script>
export default {
  name: "BasePageLoader",
  props: {
    customClass: String,
  },
};
</script>

<style lang="scss">
.base-page-lader {
  height: calc(100vh - 96px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>