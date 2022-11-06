import { ISidebarBase } from "./common";
import {
  IAsset,
  IContentfulBase,
  IContentfulItemCollection,
  IRichText,
} from "./contentful";

export interface IPageBasedData extends IContentfulBase {
  title: string;
  slug: string;
  textarea: IRichText;
  asideCollection: IContentfulItemCollection<ISidebarBase>;
}

export interface IDataProduct extends IPageBasedData {
  summary: string;
  image: IAsset;
  galleryCollection: IContentfulItemCollection<IAsset>;
}

export interface IDataReference extends IPageBasedData {
  summary: string;
  image: IAsset;
  galleryCollection: IContentfulItemCollection<IAsset>;
}

export interface IDataNews extends IPageBasedData {
  category: string;
}
