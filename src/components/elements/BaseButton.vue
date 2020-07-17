<template>
  <button class="base-button" :class="btnClass">{{ name }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    name: String,
    btnClass: String
  }
};
</script>

<style lang="scss">
.base-button {
  padding: 12px 133px;
  border-radius: $borderRadius;
  background: $appThemeColor;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  color: $white;
  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: $boxShadow2;
  }
}
</style>