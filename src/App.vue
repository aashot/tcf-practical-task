<template>
  <div id="app">
    <b-container class="view-container" fluid>
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
  name: "App"
};
</script>

<style lang="scss">
@import "@/scss/components/_main.scss";
</style>
