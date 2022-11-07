import { ItemNavigation, ItemResource } from "./common";
import { Document } from "@contentful/rich-text-types";

export interface IContentfulResponse<T> extends Response {
  data: IContentfulResponseData<T>;
  errors: IContentfulResponseError;
}
export interface IContentfulResponseError {
  message: string;
  locations: any;
}
export interface IContentfulResponseData<T> {
  collection: IContentfulItemCollection<T>;
  pages: IContentfulItemCollection<T>;
  news: IContentfulItemCollection<T>;
  products: IContentfulItemCollection<T>;
  references: IContentfulItemCollection<T>;
}
export interface IContentfulItemCollection<T> {
  total: number;
  skip: number;
  limit: number;
  items: T[];
}
export interface IPageDataProps<T> {
  page?: T; //ContentfulPage or ContentfulNews
  menu?: ItemNavigation;
  secondaryMenu?: ItemNavigation;
  footerMenu?: ItemNavigation;
  resources?: ItemResource[];
  assets?: IImage[];
}
export interface IContentfulBase {
  sys?: IContentfulSys;
  __typename?: string;
}
interface IContentfulSys {
  id: number;
  publishedAt: Date;
}

export interface IAsset extends IContentfulBase {
  title: string;
  url: string;
  width: number;
  height: number;
  thumb: string;
  description: string;
  downloadUrl: string;
}

export interface IDocument extends IContentfulBase {
  title: string;
  description: string;
  fileName: string;
  url: string;
  height: number;
  width: number;
}

export interface IImage extends IAsset {
  contentType: string;
  thumb: string;
}

export interface IVideo extends IAsset {
  contentType: string;
}

export interface IPdf extends IAsset {
  contentType: string;
}

export interface IRichText {
  json: Document;
  links: IDocumentLinks;
}

export interface IDocumentLinks {
  assets: {
    block: IImage[];
    blocks: IImage[];
  };
  entries: {
    inline: IContentfulBase[];
  };
}
