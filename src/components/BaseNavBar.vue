<template>
  <v-app-bar app color="primary" dark>
    <div>myApp</div>
    <v-spacer />
    <v-btn color="success" to="/" class="mr-3"> Графики </v-btn>
    <v-btn color="warning" to="/list"> Список </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class BaseNavBar extends Vue {}
</script>
