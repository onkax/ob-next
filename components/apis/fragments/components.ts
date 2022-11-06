import {
  pageListFragment,
  newsListFragment,
  productListFragment,
  referenceListFragment,
} from "./pages";

export const componentHeroFragment = `
fragment componentHeroFragment on ComponentHero {
    sys {
      id
    }
    headline
    tagline
    desc: summary {
      json
    }
    media {
      ...assetFragment
    }
    ctaButtonText
    ctaNavigateTo {
      ...pageListFragment
      ...newsListFragment
      ...productListFragment
      ...referenceListFragment
    }
    ctaExternalUrl
    isImageLeftAligned
  }
`;

export const componentArticleFragment = `
fragment componentArticleFragment on ComponentArticle {
    sys {
      id
    }
    title
    category
    textarea {
      json
    }
    asideCollection(limit: 3) {
      total
      skip
      limit
      items {
        __typename
      }
    }
  }
`;

export const componentDataListFragment = `
fragment componentDataListFragment on ComponentDataList {
    sys {
      id
    }
    title
    summary
    dataCollection(limit: 50) {
      total
      skip
      limit
      items {
        __typename
        ...dataNewsFragment
        ...dataProductFragment
        ...dataReferencesFragment
      }
    }
    slideOnMobile
  }
`;

export const componentPageHeaderFragment = `
fragment componentPageHeaderFragment on ComponentPageHeader {
    sys {
      id
    }
    headline
    tagline
    backgroundCollection(limit: 9) {
      total
      skip
      limit
      items {
        ...assetFragment
      }
    }
    ctaButtonText
    ctaNavigateTo {
        ...pageListFragment
        ...newsListFragment
        ...productListFragment
        ...referenceListFragment
    }
    ctaExternalUrl
    ctaBox {
      __typename
    }
  }
`;
