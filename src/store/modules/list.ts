import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import axios from "axios";

export type PetrsuListItem = {
  albumId: number | undefined;
  id: number | undefined;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export interface PetrsuListState {
  list: PetrsuListItem[];
}

@Module
class PetrsuListModule extends VuexModule implements PetrsuListState {
  public list: PetrsuListItem[] = [];

  get GetList() {
    return this.list;
  }

  @Mutation
  private SetList(list: PetrsuListItem[]) {
    this.list = list;
  }
  @Action
  async UpdateList() {
    const r = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10"
    );
    this.SetList(r.data);
  }
}
export const PetrsuListStore = new PetrsuListModule({
  store,
  name: "ListStore"
});
