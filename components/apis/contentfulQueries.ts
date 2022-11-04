export const assetFragment = `
fragment assetFragment on Asset {
  sys {id}
  title
  description
  fileName
  contentType
  url(
    transform: {
      format: WEBP
      quality: 90
    }
  )
  thumb:url(
    transform: {
      format: WEBP
      quality: 90
      width:260
      height:195
      resizeStrategy: PAD
    }
  )
  downloadUrl:url
  width
  height
}
`;

export const itemResourceFragment = `
fragment itemResourceFragment on ItemResource {
  key
  value
}
`;

export const itemNavigationFragment = `
fragment itemNavigationFragment on ItemNavigation {
  sys{id}
  title
  navigateTo
  subItemsCollection(limit: 10) {
    items {
      sys{id}
      title
      navigateTo
      subItemsCollection(limit: 9) {
        items {
          sys{id}
          title
          navigateTo
          summary
          cssClass
          subItemsCollection(limit: 9) {
            items {
              sys{id}
              title
              navigateTo
              summary
              cssClass
            }
          }
        }
      }
    }
  }
}
`;

export const seoFragment = `
fragment seoFragment on PageSeo {
  sys {id}
  title
  description
  keywords
  noIndex
  noFollow
}
`;

export const componentHeroFragment = `
fragment componentHeroFragment on ComponentHero {
  sys{id}
  media {
    ...assetFragment
  }
}
${assetFragment}
`;

export const componentPageBannerFragment = `
fragment componentPageBannerFragment on ComponentPageHeader {
  sys{id}
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
  bodyCollection(limit:9) {
    items {
      __typename
      ...componentHeroFragment
      ...componentPageBannerFragment
    }
  }
}
${seoFragment}
${componentPageBannerFragment}
${componentHeroFragment}
`;

export const getPageBySlugQuery = `
query GetPageBySlug($slug: String!, $isPreview: Boolean) {
  collection: pageCollection(where: {slug: $slug}, limit: 1, preview: $isPreview){
    items {
      ...pageFragment
    }
  }
}
${pageFragment}
`;

export const pageListFragment = `
fragment pageListFragment on Page {
  slug
}
`;

export const getAllPagesQuery = `
query GetAllPages{
  collection: pageCollection {
    items {
      ...pageListFragment
    }
  }
}
${pageListFragment}
`;

export const getAllResourcesQuery = `
query GetAllResources($isPreview: Boolean) {
  collection: itemResourceCollection(limit: 1000, preview: $isPreview) {
    items {
      ...itemResourceFragment
    }
  }
}
${itemResourceFragment}
`;

export const getMenuQuery = `
query GetMenu($title: String!, $isPreview: Boolean) {
  collection: itemNavigationCollection(where: {title: $title}, limit:1, preview: $isPreview) {
    items{
      ...itemNavigationFragment
    }
  }
}
${itemNavigationFragment}
`;

export const getAssetQuery = `
query GetAssetByTitle($title: [String]!) {
  collection: assetCollection(where: {title_in: $title}) {
    items {
      ...assetFragment
    }
  }
}
${assetFragment}
`;

export const getContentByIdQuery = `
query getContentById($id: String!) {
  collection: entryCollection(where: {sys: {id: $id}}, preview: true, limit: 1) {
    items {
      sys {
        id
      }
      __typename
      ...componentHeroFragment
      ...componentPageBannerFragment
    }
  }
}
${componentHeroFragment}
${componentPageBannerFragment}
`;
