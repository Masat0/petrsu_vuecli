<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-menu v-model="menu" :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormatted"
              :label="label"
              :prepend-inner-icon="prependInnerIcon"
              :clearable="clearable"
              :error-messages="errorMessages"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="field"
            :first-day-of-week="1"
            locale="ru"
            :min="minDateText"
            :max="maxDateText"
            no-title
            scrollable
            @change="menu = false"
          />
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

@Component
export default class BaseDatePicker extends Vue {
  // Значение даты
  @Prop({ default: undefined }) value: moment.Moment | undefined;
  // Список ошибок при валидации поля
  @Prop({
    default() {
      return [];
    }
  })
  readonly errorMessages!: string[] | undefined;
  // Метка для поля
  @Prop({ default: "" }) readonly label: string | undefined;
  // Описание поля
  @Prop({ default: "" }) readonly placeholder: string | undefined;
  // Иконка перед полем
  @Prop({ default: "" }) readonly prependInnerIcon: string | undefined;
  // Минимально допустимая дата
  @Prop({ default: undefined }) readonly minDate: moment.Moment | undefined;
  // Максимально допустимая дата
  @Prop({ default: undefined }) readonly maxDate: moment.Moment | undefined;
  // Набор стилистических классов
  @Prop({ default: "" }) readonly cls: string | undefined;
  // Признак уменьшения высоту поля
  @Prop({ default: false }) readonly dense: boolean | undefined;
  // Скрытие деталей поля
  @Prop({ default: false }) readonly hideDetails: boolean | undefined;
  // Признак добавления иконки очистки формы
  @Prop({ default: false }) readonly clearable: boolean | undefined;

  // Признак отображения меню с выбором дат
  menu = false;

  get field(): string | undefined {
    return this.value !== undefined
      ? this.value.format("YYYY-MM-DD")
      : undefined;
  }
  set field(newValue: string | undefined) {
    this.$emit("input", moment(newValue, "YYYY-MM-DD"));
  }

  // Текстовое представление минимально возможной даты
  get minDateText(): string {
    return this.minDate !== undefined ? this.minDate.format("YYYY-MM-DD") : "";
  }

  // Текстовое представление максимально возможной даты
  get maxDateText(): string {
    return this.maxDate !== undefined ? this.maxDate.format("YYYY-MM-DD") : "";
  }

  /**
   * Дата в строковом представлении
   */
  get computedDateFormatted() {
    return this.field
      ? moment(this.field, "YYYY-MM-DD").format("DD.MM.YYYY")
      : "";
  }
}
</script>
