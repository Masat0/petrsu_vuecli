<template>
  <v-card elevation="5">
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" md="7" lg="8" xl="9">
          <highcharts ref="chart" :options="chartOptions" />
        </v-col>
        <v-col cols="12" md="5" lg="4" xl="3">
          <v-card class="pa-1">
            <div class="d-flex flex-nowrap">
              <div class="d-flex align-center ml-2">
                Тип графика:
                <v-tooltip top content-class="top">
                  <template #activator="{ on }">
                    <v-btn icon v-on="on" @click="setTypeChart('line')">
                      <v-icon
                        :color="typeChart == 'line' ? 'green' : 'grey'"
                        medium
                      >
                        {{ iconChartLine }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Линия</span>
                </v-tooltip>
                <v-tooltip top content-class="top">
                  <template #activator="{ on }">
                    <v-btn icon v-on="on" @click="setTypeChart('column')">
                      <v-icon
                        :color="typeChart == 'column' ? 'green' : 'grey'"
                        medium
                      >
                        {{ iconChartBar }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Столбцы</span>
                </v-tooltip>
              </div>
              <div class="ml-auto">
                <v-tooltip top content-class="top">
                  <template #activator="{ on }">
                    <v-btn icon v-on="on" @click="removeChart(dataChart)">
                      <v-icon :color="'red'">
                        {{ iconCloseBox }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <span>Удалить график</span>
                </v-tooltip>
              </div>
            </div>
            <div class="d-flex align-center ml-2">
              Фильтр по датам

              <v-tooltip top content-class="top">
                <template #activator="{ on }">
                  <v-btn icon v-on="on" @click="clearFilter()">
                    <v-icon color="blue">
                      {{ iconBackspace }}
                    </v-icon>
                  </v-btn>
                </template>

                <span>Очистить фильтр</span>
              </v-tooltip>
            </div>
            <v-container fluid>
              <v-row dense>
                <v-col cols="auto">
                  <BaseDatePicker
                    v-model="start"
                    label="Старт измерений"
                    :clearable="false"
                    :prepend-inner-icon="iconCalendar"
                    :min-date="minDate"
                    :max-date="end"
                  />
                </v-col>
                <v-col cols="auto">
                  <BaseDatePicker
                    v-model="end"
                    label="Окончание измерений"
                    :clearable="false"
                    :prepend-inner-icon="iconCalendar"
                    :min-date="start"
                    :max-date="maxDate"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Emit, Watch } from "vue-property-decorator";
import PetrsuChart from "../models/PetrsuChart";
import BaseDatePicker from "@/components/BaseDatePicker.vue";
import { Chart } from "highcharts-vue";

import {
  mdiChartLine,
  mdiChartBar,
  mdiCloseBox,
  mdiCalendar,
  mdiBackspace
} from "@mdi/js";
import moment from "moment";

@Component({
  components: {
    BaseDatePicker,
    highcharts: Chart
  }
})
export default class PetrsuChartItem extends Vue {
  @Prop() dataChart!: PetrsuChart;

  @Ref("chart") highchart!: any;

  iconChartLine = mdiChartLine;
  iconChartBar = mdiChartBar;
  iconCloseBox = mdiCloseBox;
  iconCalendar = mdiCalendar;
  iconBackspace = mdiBackspace;

  typeChart = "line";

  start: moment.Moment = this.dataChart.labels[0];

  minDate: moment.Moment = this.dataChart.labels[0];

  end: moment.Moment = this.dataChart.labels[this.dataChart.labels.length - 1];

  maxDate: moment.Moment = this.dataChart.labels[
    this.dataChart.labels.length - 1
  ];

  // Опции для отображения графика
  get chartOptions() {
    return {
      chart: {
        type: this.typeChart
      },
      title: {
        text: this.dataChart.title
      },
      xAxis: {
        categories: this.dataChart.labels.map(label =>
          label.format("DD.MM.YYYY")
        )
      },
      series: [
        {
          data: this.dataChart.data
        }
      ]
    };
  }

  get formatLabels(): string[] {
    return this.dataChart.labels.map((label: moment.Moment) => {
      return moment(label).format("DD.MM.YYYY");
    });
  }

  @Watch("start")
  onStartChange(value: moment.Moment) {
    this.filterByDate(value, this.end);
  }

  @Watch("end")
  onEndChange(value: moment.Moment) {
    this.filterByDate(this.start, value);
  }

  /**
   * Устанавливает тип чата
   */
  public setTypeChart(type: string): void {
    if (this.typeChart !== type) {
      this.typeChart = type;

      this.highchart.chart.series.forEach(function(el: {
        update: (arg0: { type: string }) => void;
      }) {
        el.update({
          type
        });
      });
    }
  }

  /**
   * Очищает фильтр
   */
  public clearFilter(): void {
    this.start = this.dataChart.labels[0];
    this.end = this.dataChart.labels[this.dataChart.labels.length - 1];
  }

  /**
   * Фильтрует по промежутку
   */
  public filterByDate(minDate: moment.Moment, maxDate: moment.Moment): void {
    const dataChart = this.dataChart;

    this.highchart.chart.series[0].update({
      data: dataChart.data.filter((_, i) => {
        const dt = dataChart.labels[i];
        return dt >= minDate && dt <= maxDate;
      })
    });

    this.highchart.chart.xAxis[0].update({
      categories: dataChart.labels
        .filter(item => {
          return item >= minDate && item <= maxDate;
        })
        .map(label => label.format("DD.MM.YYYY"))
    });
  }

  @Emit("remove-chart")
  removeChart(data: PetrsuChart) {
    return data;
  }
}
</script>
