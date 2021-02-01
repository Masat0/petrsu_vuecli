<template>
  <v-alert :color="alert.type" :icon="alert.icon" :dense="dense" text outlined>
    {{ alert.message }}
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UIAlert, UIAlertTypes } from "../models/UIAlert";

@Component
export default class BaseAlert extends Vue {
  @Prop({ default: false }) readonly dense!: boolean;
  @Prop({ default: new UIAlert(UIAlertTypes.Warning, "") }) alert!: UIAlert;
}
</script>
