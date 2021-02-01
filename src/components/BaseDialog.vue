<template>
  <v-dialog v-bind="$attrs" :transition="false" persistent v-on="$listeners">
    <v-card>
      <v-toolbar :color="titleColor" light flat class="white--text">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <slot name="toolbar-btn" />

        <v-btn text icon color="white" @click="close()">
          <v-icon color="white">
            {{ iconClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider />

      <template v-if="showAlert">
        <BaseAlert :alert="alert" :dense="dense" class="ma-4" />

        <v-divider />
      </template>

      <v-card-text :class="cardTextCls">
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions v-if="showActions">
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" sm="7">
              <div
                v-if="showRequiredText"
                class="px-3 secondary--text required"
              >
                <small
                  ><label /> Поля отмеченные звездочкой обязательны для
                  заполнения</small
                >
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-btn
                :form="formId"
                tile
                color="success"
                class="mr-3"
                style="text-transform: none !important"
                @click="submit()"
              >
                Добавить
              </v-btn>

              <v-btn
                color="secondary"
                outlined
                tile
                style="text-transform: none !important"
                @click="close()"
              >
                Отмена
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import BaseAlert from "@/components/BaseAlert.vue";
import { mdiClose } from "@mdi/js";
import { UIAlert, UIAlertTypes } from "../models/UIAlert";
@Component({
  components: {
    BaseAlert
  }
})
export default class BaseDialog extends Vue {
  @Prop({ default: "" }) readonly title: string | undefined;
  @Prop({ default: "primary" }) readonly titleColor: string | undefined;
  @Prop({ default: "" }) readonly formId: string | undefined;
  @Prop({ default: "px-1 pt-1" }) readonly cardTextCls: string | undefined;
  @Prop({ default: false }) readonly showAlert: boolean | undefined;
  @Prop({ default: true }) readonly showActions: boolean | undefined;
  @Prop({ default: true }) readonly showRequiredText: boolean | undefined;
  @Prop({ default: new UIAlert(UIAlertTypes.Warning, "") })
  readonly alert!: UIAlert;
  @Prop({ default: false }) readonly dense!: boolean;

  inheritAttrs = false;

  iconClose = mdiClose;

  @Emit("event-close")
  close() {
    return true;
  }

  @Emit("event-submit")
  submit() {
    return true;
  }
}
</script>

<style scoped lang="scss">
.v-toolbar {
  flex: none !important;

  .v-toolbar__title {
    font-weight: 500 !important;
    font-size: 18px;
    letter-spacing: normal;
    line-height: 2rem;
  }
}
.base-dialog__content {
  flex: 1 1 auto;
}
</style>
