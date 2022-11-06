import { ISidebarBase } from "./common";
import {
  IAsset,
  IContentfulBase,
  IContentfulItemCollection,
  IRichText,
} from "./contentful";
import { IPageBasedData } from "./data";

export interface IComponentPageHeader extends IContentfulBase {
  headline: string;
  tagline: string;
  backgroundCollection: IContentfulItemCollection<IAsset>;
  ctaButtonText: string;
  ctaNavigateTo: IPageBasedData;
  ctaExternalUrl: string;
  ctaBox: IContentfulBase;
}

export interface IComponentDataList extends IContentfulBase {
  title: string;
  summary: string;
  dataCollection: IContentfulItemCollection<IPageBasedData>;
  slideOnMobile: boolean;
}

export interface IComponentArticle extends IContentfulBase {
  title: string;
  category: string;
  textarea: IRichText;
  asideCollection: IContentfulItemCollection<ISidebarBase>;
}

export interface IComponentHero extends IContentfulBase {
  headline: string;
  tagline: string;
  desc: IRichText;
  media: IAsset;
  ctaButtonText: string;
  ctaNavigateTo: IPageBasedData;
  ctaExternalUrl: string;
  isImageLeftAligned: boolean;
}
