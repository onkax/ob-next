import { assetFragment } from "./common";
import {
  componentArticleFragment,
  componentDataListFragment,
  componentHeroFragment,
  componentPageHeaderFragment,
} from "./components";
import {
  sidebarMediaFragment,
  sidebarAssetListFragment,
  sidebarTextareaFragment,
} from "./sidebars";

export const pageListFragment = `
fragment pageListFragment on Page {
    slug
  }
`;

export const newsListFragment = `
fragment newsListFragment on DataNews {
    slug
  }
`;

export const productListFragment = `
fragment productListFragment on DataProduct {
    slug
  }  
`;

export const referenceListFragment = `
fragment referenceListFragment on DataReferences {
    slug
  }
`;

export const pageSeoFragment = `
fragment seoFragment on PageSeo {
    sys {
      id
    }
    __typename
    title
    description
    keywords
    noIndex
    noFollow
  }
`;

export const pageFragment = `
fragment pageFragment on Page {
  sys {
    id
    publishedAt
  }
  seo {
    ...seoFragment
  }
  slug
  collection: bodyCollection(limit: 9) {
    items {
      __typename
      ...componentHeroFragment
      ...componentArticleFragment
      ...componentDataListFragment
      ...componentPageHeaderFragment
    }
  }
}
`;
