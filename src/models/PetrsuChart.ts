import moment from "moment";

export default class PetrsuChart {
  // Идентификатор графика
  readonly id: number;

  // Заголовок графика
  readonly title: string;

  // Данные графика
  readonly data: number[];

  // Список дней между датами
  readonly labels: moment.Moment[];

  // Дата старта измерений для данных графика
  readonly start: moment.Moment;

  // Дата окончания измерений для данных графика
  readonly end: moment.Moment;

  constructor(title: string, start: moment.Moment, end: moment.Moment) {
    this.id = new Date().getTime();
    this.title = title;
    this.start = start;
    this.end = end;
    this.data = this.generateRandomNumbers(end.diff(start, "days"), 100);
    this.labels = this.generateLabels();
  }

  /**
   * Генерирует массив случайных чисел
   */
  private generateRandomNumbers(length: number, max: number): number[] {
    return [...new Array(length + 1)].map(() =>
      Math.round(Math.random() * max)
    );
  }

  /**
   * Получает список дней между датами
   */
  private generateLabels(): moment.Moment[] {
    const days = [];
    let currentDate = this.start;
    while (currentDate <= this.end) {
      days.push(moment(currentDate.format("YYYY-MM-DD")));
      currentDate = currentDate.add(1, "days");
    }
    return days;
  }
}
