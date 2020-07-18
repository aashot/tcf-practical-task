<template>
  <b-form-group id="input-group-password" class="input-group-password">
    <b-form-input
      id="input-password"
      :type="passwordInputType"
      :value="value"
      ref="passwordInput"
      @input="changeValue"
      required
      placeholder="Enter your password"
    ></b-form-input>

    <button @click.prevent="togglePasswordInputType" class="toggle-password-input-type">
      <img
        src="@/assets/icons/eye.svg"
        class="toggle-password-input-type--img"
        alt="toggle-password-input-type"
      />
    </button>
  </b-form-group>
</template>

<script>
export default {
  name: "BasePasswordInput",

  props: {
    value: String
  },

  model: {
    event: "modified"
  },

  data() {
    return {
      passwordInputType: "password"
    };
  },

  methods: {
    togglePasswordInputType() {
      if (this.passwordInputType === "password") {
        this.passwordInputType = "text";
      } else {
        this.passwordInputType = "password";
      }
    },

    changeValue(e) {
      this.$emit("modified", e);
    }
  }
};
</script>

<style lang="scss">
.input-group-password {
  position: relative;
}

.toggle-password-input-type {
  border: none;
  background: transparent;
  outline: none;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);

  &--img {
    width: 22px;
    height: 15px;
  }

  &:hover {
    opacity: 0.7;
  }
}
</style>