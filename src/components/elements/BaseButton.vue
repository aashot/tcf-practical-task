<template>
  <button class="base-button" :class="btnClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
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
  white-space: nowrap;

  &:hover {
    box-shadow: $boxShadow2;
  }
}
</style>