<template>
  <BaseDialog
    v-model="showDialog"
    title="Добавление нового графика"
    :alert="alert"
    :show-alert="showAlert"
    :dense="true"
    max-width="600px"
    @event-submit="submit()"
    @event-close="close()"
  >
    <validation-observer ref="observer" tag="form">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" class="pb-0 mb-0">
            <validation-provider
              v-slot="{ errors }"
              name="Имя графика"
              rules="required"
            >
              <v-text-field
                v-model="form.title"
                :error-messages="errors"
                outlined
                clearable
                class="required"
                label="Имя графика"
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ errors }"
              name="Старт изменений"
              rules="required"
              style="width: 50%"
            >
              <BaseDatePicker
                v-model="form.start"
                label="Старт измерений"
                :clearable="false"
                :prepend-inner-icon="iconCalendar"
                :error-messages="errors"
                class="required"
                color="primary"
                hide-details
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ errors }"
              name="Окончание изменений"
              rules="required"
              style="width: 50%"
            >
              <BaseDatePicker
                v-model="form.end"
                label="Окончание измерений"
                :clearable="false"
                :prepend-inner-icon="iconCalendar"
                :error-messages="errors"
                class="required"
                color="primary"
                hide-details
              />
            </validation-provider>
          </v-col>
        </v-row>
      </v-container>
    </validation-observer>
  </BaseDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Emit } from "vue-property-decorator";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseDatePicker from "@/components/BaseDatePicker.vue";
import { mdiCalendar } from "@mdi/js";
import { PetrsuChartStore } from "@/store/modules/chart";
import { ValidationObserver } from "vee-validate";
import PetrsuChart from "../models/PetrsuChart";
import { UIAlert, UIAlertTypes } from "../models/UIAlert";

/**
 * Форма создания нового графика
 */
class ChartForm {
  // Заголовок графика
  title: string;
  // Дата старта измерений для данных графика
  start: moment.Moment | undefined;
  // Дата окончания измерений для данных графика
  end: moment.Moment | undefined;

  constructor() {
    this.title = "";
    this.start = undefined;
    this.end = undefined;
  }
}

@Component({
  components: {
    BaseDialog,
    BaseDatePicker
  }
})
export default class PetrsuChartNew extends Vue {
  @Prop({ default: false }) value!: boolean;

  @Ref("observer") observer!: InstanceType<typeof ValidationObserver>;

  // Форма создания нового графика
  public form: ChartForm;

  // Предупреждения для пользователя
  public alert: UIAlert;

  // Созданные графики
  get charts() {
    return PetrsuChartStore.GetCharts;
  }

  constructor() {
    super();
    this.form = new ChartForm();
    this.alert = new UIAlert(UIAlertTypes.Warning, "");
  }

  // Признак того, нужно ли показывать предупреждение
  showAlert = false;

  // Иконка для календаря
  iconCalendar = mdiCalendar;

  get showDialog(): boolean {
    return this.value;
  }
  set showDialog(newValue: boolean) {
    this.$emit("input", newValue);
  }

  @Emit("event-submit")
  eventSubmit(chart: PetrsuChart) {
    return chart;
  }

  /**
   * Закрывает окно создания графика
   */
  public close(): Promise<void> {
    this.showDialog = false;
    return new Promise(resolve =>
      setTimeout(() => {
        this.observer.reset();
        this.form = new ChartForm();
        this.showAlert = false;
        resolve();
      }, 300)
    );
  }

  /**
   * Сохранить данные формы
   */
  public async submit(): Promise<void> {
    const valid = await this.observer.validate();
    if (valid) {
      if (this.form.start && this.form.end && this.form.start > this.form.end) {
        this.alert.message =
          "Дата старта измерений не может быть позже даты окончания измерений";
        this.alert.type = UIAlertTypes.Warning;
        this.showAlert = true;
        return;
      }
      const isTitleExists = this.charts.some(obj => {
        return obj.title === this.form.title;
      });
      if (isTitleExists) {
        this.alert.message = "График с таким наименованием уже существует";
        this.alert.type = UIAlertTypes.Warning;
        this.showAlert = true;
        return;
      }

      const chart = new PetrsuChart(
        this.form.title,
        this.form.start as moment.Moment,
        this.form.end as moment.Moment
      );

      const isDataExists = this.charts.some(item => {
        return (
          JSON.stringify(item.labels) === JSON.stringify(chart.labels) &&
          JSON.stringify(item.data) === JSON.stringify(chart.data)
        );
      });

      if (isDataExists) {
        this.showAlert = true;
        this.alert.message = "График с таким данными уже существует";
        this.alert.type = UIAlertTypes.Warning;
        return;
      }

      this.eventSubmit(chart);
      this.close();
    }
  }
}
</script>
