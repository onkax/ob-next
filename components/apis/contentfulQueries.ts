import { assetFragment } from "./fragments/common";
import {
  componentArticleFragment,
  componentDataListFragment,
  componentHeroFragment,
  componentPageHeaderFragment,
} from "./fragments/components";
import {
  dataNewsFragment,
  dataProductFragment,
  dataReferencesFragment,
} from "./fragments/datas";
import {
  itemNavigationFragment,
  itemResourceFragment,
} from "./fragments/items";
import {
  newsListFragment,
  pageFragment,
  pageListFragment,
  pageSeoFragment,
  productListFragment,
  referenceListFragment,
} from "./fragments/pages";
import {
  sidebarMediaFragment,
  sidebarAssetListFragment,
  sidebarTextareaFragment,
} from "./fragments/sidebars";

export const GetAllPagesQuery = `
query GetAllPagesQuery {
  pages: pageCollection(limit: 31) {
    items {
      ...pageListFragment
    }
  }
  news: dataNewsCollection(limit: 31) {
    items {
      ...newsListFragment
    }
  }
  products: dataProductCollection(limit: 31) {
    items {
      ...productListFragment
    }
  }
  references: dataReferencesCollection(limit: 31) {
    items {
      ...referenceListFragment
    }
  }
}
${pageListFragment}
${newsListFragment}
${productListFragment}
${referenceListFragment}
`;

export const GetAllResourcesQuery = `
query GetAllResourcesQuery($isPreview: Boolean) {
  collection: itemResourceCollection(limit: 1000, preview: $isPreview) {
    items {
      ...itemResourceFragment
    }
  }
}
${itemResourceFragment}
`;

export const GetMenuByTitleQuery = `
query GetMenuByTitleQuery($title: String!, $isPreview: Boolean) {
  collection: itemNavigationCollection(where: {title: $title}, limit:1, preview: $isPreview) {
    items{
      ...itemNavigationFragment
    }
  }
}
${pageListFragment}
${newsListFragment}
${productListFragment}
${referenceListFragment}
${itemNavigationFragment}
${assetFragment}
`;

export const GetAssetByTitlesQuery = `
query GetAssetByTitlesQuery($title: [String]!) {
  collection: assetCollection(where: {title_in: $title}) {
    items {
      ...assetFragment
    }
  }
}
${assetFragment}
`;

export const GetContentByIdQuery = `
query GetContentByIdQuery($id: String!) {
  collection: entryCollection(where: {sys: {id: $id}}, preview: true, limit: 1) {
    items {
      sys {
        id
      }
      __typename
    }
  }
}
`;

export const GetPageBySlugQuery = `
query GetPageBySlugQuery($slug: String!, $isPreview: Boolean) {
  pages: pageCollection(where: {slug: $slug}, limit: 1, preview: $isPreview) {
    items {
      ...pageFragment
    }
  }
  news: dataNewsCollection(where: {slug: $slug}, limit: 1, preview: $isPreview) {
    items {
      ...dataNewsFragment
    }
  }
  products: dataProductCollection(where: {slug: $slug}, limit: 1, preview: $isPreview) {
    items {
      ...dataProductFragment
    }
  }
  references: dataReferencesCollection(where: {slug: $slug}, limit: 1, preview: $isPreview) {
    items {
      ...dataReferencesFragment
    }
  }
}
${assetFragment}
${pageListFragment}
${newsListFragment}
${productListFragment}
${referenceListFragment}
${pageSeoFragment}
${componentHeroFragment}
${componentArticleFragment}
${componentDataListFragment}
${componentPageHeaderFragment}
${sidebarMediaFragment}
${sidebarAssetListFragment}
${sidebarTextareaFragment}
${pageFragment}
${dataNewsFragment}
${dataProductFragment}
${dataReferencesFragment}
`;
