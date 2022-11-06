import { IContentfulBase, IContentfulItemCollection } from "./contentful";

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
  bodyCollection?: IContentfulItemCollection<IContentfulBase>;
}

export interface INewsPages extends IContentfulPageBase {
  category?: string;
}

export interface IProductPages extends IContentfulPageBase {
  category?: string;
}

export interface IReferencePages extends IContentfulPageBase {
  category?: string;
}
