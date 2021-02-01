<template>
  <v-app>
    <BaseNavBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BaseNavBar from "./components/BaseNavBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    BaseNavBar
  },

  data: () => ({
    //
  })
});
</script>

<style>
@import "./assets/main.css";
</style>
