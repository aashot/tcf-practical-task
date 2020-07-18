<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    if (this.$route.name !== "signup") {
      this.$router.push({ name: "signup" });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/components/_main.scss";
</style>
