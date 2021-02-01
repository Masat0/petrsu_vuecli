import { VuexModule, Module, Mutation } from "vuex-class-modules";
import PetrsuChart from "../../models/PetrsuChart";
import store from "@/store";

export interface PetrsuChartState {
  charts: PetrsuChart[];
}
@Module
class PetrsuChartModule extends VuexModule implements PetrsuChartState {
  public charts: PetrsuChart[] = [];

  get GetCharts() {
    return this.charts;
  }

  @Mutation
  public add(payload: PetrsuChart) {
    this.charts.push(payload);
  }

  @Mutation
  public remove(payload: PetrsuChart) {
    const idx = this.charts.findIndex(item => item.id === payload.id);
    this.charts.splice(idx, 1);
  }
}

export const PetrsuChartStore = new PetrsuChartModule({
  store,
  name: "ChartStore"
});
