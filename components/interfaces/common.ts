import { isAbsolute } from "path";
import { InternalSymbolName } from "typescript";
import {
  IContentfulItemCollection,
  IContentfulBase,
  IAsset,
} from "./contentful";
import { IPageBasedData } from "./data";

export interface ItemNavigation extends IContentfulBase {
  title: string;
  navigateTo: IPageBasedData;
  externalUrl: string;
  logo: IAsset;
  subNavigationCollection: IContentfulItemCollection<ItemNavigation>;
}

export interface ItemResource extends IContentfulBase {
  key: string;
  value: string;
}

export interface ISidebarBase extends IContentfulBase {
  [key: string]: any;
}
