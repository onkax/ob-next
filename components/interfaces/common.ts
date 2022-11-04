import { IContentfulItemCollection, IContentfulBase } from "./contentful";

export interface ItemNavigation extends IContentfulBase {
  subItemsCollection: IContentfulItemCollection<ItemNavigation>;
  items: ItemNavigation[];
  navigateTo: string;
  title: string;
  secondary: boolean;
  summary: string;
  cssClass: string;
}

export interface ItemResource extends IContentfulBase {
  key: string;
  value: string;
}

export interface SelectItem {
  id: string;
  label: string;
  value: string;
}
