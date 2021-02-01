<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="4" lg="3" xl="2">
        <v-card elevation="2" outlined tile height="100%">
          <template v-if="items && items.length">
            <v-container>
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="`item-${item.id}`"
                  cols="12"
                  class="pa-2"
                  @click="clickItem(item)"
                >
                  {{ item.title.substring(0, 20) + "..." }}
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-else>
            <div>Данных нет</div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" lg="9" xl="10">
        <v-card elevation="2" outlined tile height="100%">
          <v-card-text v-if="selectedItem && selectedItem.url">
            <v-container>
              <v-row>
                <v-col cols="6" sm="7" xl="5">
                  <v-img
                    :src="selectedItem.url"
                    aspect-ratio="1"
                    class="list-item-img"
                  />
                </v-col>
                <v-col cols="6" sm="5" xl="7">
                  {{ selectedItem.title }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseAlert from "@/components/BaseAlert.vue";
import { PetrsuListStore, PetrsuListItem } from "@/store/modules/list";

@Component({
  components: {
    BaseAlert
  }
})
export default class PetrsuList extends Vue {
  selectedItem: PetrsuListItem = {
    albumId: undefined,
    id: undefined,
    title: "",
    url: "",
    thumbnailUrl: ""
  };

  get items() {
    return PetrsuListStore.GetList;
  }

  created() {
    PetrsuListStore.UpdateList();
  }

  public clickItem(item: PetrsuListItem): void {
    this.selectedItem = item;
  }
}
</script>

<style scoped lang="scss">
.list-item-img {
  max-width: 600px;
  height: 100%;
}
</style>
