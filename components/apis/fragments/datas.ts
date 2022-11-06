export const dataNewsFragment = `
fragment dataNewsFragment on DataNews {
  sys {
    id
  }
  title
  slug
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
      ...sidebarMediaFragment
      ...sidebarAssetListFragment
      ...sidebarTextareaFragment
    }
  }
}
`;

export const dataProductFragment = `
fragment dataProductFragment on DataProduct {
  sys {
    id
  }
    title
    slug
    summary
    textarea {
      json
    }
    image {
      ...assetFragment
    }
    galleryCollection(limit: 10) {
      total
      skip
      limit
      items {
        ...assetFragment
      }
    }
    asideCollection(limit: 3) {
      total
      skip
      limit
      items {
        __typename
        ...sidebarMediaFragment
        ...sidebarAssetListFragment
        ...sidebarTextareaFragment
      }
    }
  }
`;

export const dataReferencesFragment = `
fragment dataReferencesFragment on DataReferences {
  sys {
    id
  }
    title
    slug
    summary
    textarea {
      json
    }
    image {
      ...assetFragment
    }
    galleryCollection(limit: 10) {
      total
      skip
      limit
      items {
        ...assetFragment
      }
    }
    asideCollection(limit: 3) {
      total
      skip
      limit
      items {
        __typename
        ...sidebarMediaFragment
        ...sidebarAssetListFragment
        ...sidebarTextareaFragment
      }
    }
  }
`;
