<template>
  <v-container fluid>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <v-btn color="success" @click="openFormNewChart">
            Добавить график
          </v-btn>
        </v-col>
        <v-col>
          <BaseAlert v-if="showAlert" :alert="alert" :dense="true" />
        </v-col>
      </v-row>
    </v-container>
    <PetrsuChartNew v-model="isShowFormNewChart" @event-submit="addChart" />
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="chart in charts"
          :key="`chart-${chart.id}`"
          cols="12"
          lg="6"
          class="px-2"
        >
          <PetrsuChartItem :data-chart="chart" @remove-chart="removeChart" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseAlert from "@/components/BaseAlert.vue";
import PetrsuChartNew from "@/components/PetrsuChartNew.vue";
import PetrsuChartItem from "@/components/PetrsuChartItem.vue";
import { UIAlert, UIAlertTypes } from "../models/UIAlert";
import PetrsuChart from "../models/PetrsuChart";
import { PetrsuChartStore } from "@/store/modules/chart";

@Component({
  components: {
    BaseAlert,
    PetrsuChartNew,
    PetrsuChartItem
  }
})
export default class PetrsuCharts extends Vue {
  // Предупреждения для пользователя
  private alert: UIAlert;

  // Созданные графики
  get charts() {
    return PetrsuChartStore.GetCharts;
  }

  constructor() {
    super();
    this.alert = new UIAlert(UIAlertTypes.Warning, "");
  }

  limitCharts = 4;

  isShowFormNewChart = false;

  showAlert = false;

  /**
   * Открывает форму для добавления нового графика
   */
  public openFormNewChart(): void {
    if (this.charts.length >= this.limitCharts) {
      this.alert.message =
        "На странице может располагаться не более 4 графиков";
      this.alert.type = UIAlertTypes.Warning;
      this.showAlert = true;
      return;
    }
    this.isShowFormNewChart = true;
  }

  /**
   * Добавляет новый график
   */
  public addChart(data: PetrsuChart): void {
    PetrsuChartStore.add(data);
  }

  /**
   * Удаляет график
   */
  public removeChart(data: PetrsuChart): void {
    PetrsuChartStore.remove(data);
    if (this.showAlert && this.charts.length < this.limitCharts) {
      this.showAlert = false;
    }
  }
}
</script>
