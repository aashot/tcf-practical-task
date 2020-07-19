<template>
  <button class="base-button" :class="{ btnClass, 'inverted': inverted }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    btnClass: String,
    inverted: Boolean
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
  display: flex;
  align-items: center;

  .loader {
    margin-left: 10px;
  }

  &:hover {
    box-shadow: $boxShadow2;
  }

  &.inverted {
    background: transparent;
    color: $appThemeColor;

    &:hover {
      box-shadow: unset;
    }
  }

  &.color-white {
    color: $white;
  }
}
</style>