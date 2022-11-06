export const sidebarAssetListFragment = `
fragment sidebarAssetListFragment on SidebarAssetList {
    sys {
      id
    }
    title
    summary
    assetCollection(limit: 5) {
      items {
        ...assetFragment
      }
    }
  }
`;

export const sidebarMediaFragment = `
fragment sidebarMediaFragment on SidebarMedia {
    sys {
    id
  }
}
`;

export const sidebarTextareaFragment = `
fragment sidebarTextareaFragment on SidebarTextarea {
    sys {
    id
  }
}
`;
