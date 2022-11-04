import { ItemNavigation, ItemResource } from "./common";

export interface IContentfulResponse<T> extends Response {
  data: IContentfulResponseData<T>;
  errors: IContentfulResponseError;
}
export interface IContentfulResponseError {
  message: string;
}
export interface IContentfulResponseData<T> {
  collection: IContentfulItemCollection<T>;
}
export interface IContentfulItemCollection<T> {
  items: T[];
}
export interface IPageDataProps<T> {
  page?: T; //ContentfulPage or ContentfulNews
  menu?: ItemNavigation[];
  secondaryMenu?: ItemNavigation[];
  footerMenu?: ItemNavigation[];
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
export interface IContentfulPageBase extends IContentfulBase {
  title?: string;
  slug?: string;
  seo?: IPageSeo;
}
export interface IContentfulPage extends IContentfulPageBase {
  bodyCollection?: IContentfulItemCollection<IContentfulBase>;
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

export interface RTNode {
  data: { target?: IContentfulBase };
  nodeType: string;
}

export interface ISideBarItem extends IContentfulBase {
  title: string;
  description: string;
}

export interface IAsset extends IContentfulBase {
  title: string;
  url: string;
  width: number;
  height: number;
  contentType: string;
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
  i?: string;
}

export interface IVideo extends IAsset {
  v?: string;
}

export interface IPdf extends IAsset {
  g?: string;
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
