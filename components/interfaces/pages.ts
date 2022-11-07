import { ISidebarBase } from "./common";
import {
  IAsset,
  IContentfulBase,
  IContentfulItemCollection,
  IRichText,
} from "./contentful";
import { Document } from "@contentful/rich-text-types";

export interface IContentfulPageBase extends IContentfulBase {
  title?: string;
  slug?: string;
  seo?: IPageSeo;
}

export interface IPageSeo extends IContentfulBase {
  title: string;
  keywords: string;
  description: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
}

export interface IContentfulPage extends IContentfulPageBase {
  collection?: IContentfulItemCollection<IContentfulBase>;
  pageType?: "page" | "news" | "product" | "reference" | undefined;
}

export interface INewsPages extends IContentfulPageBase {
  category?: string;
}

export interface IProductPages extends IContentfulPageBase {
  title: string;
  slug: string;
  summary: string;
  textarea: IRichText;
  image: IAsset;
  galleryCollection: IContentfulItemCollection<IAsset>;
  asideCollection: IContentfulItemCollection<ISidebarBase>;
}

export interface IReferencePages extends IContentfulPageBase {
  category?: string;
}
