import {
  pageListFragment,
  newsListFragment,
  productListFragment,
  referenceListFragment,
} from "./pages";

export const itemResourceFragment = `
fragment itemResourceFragment on ItemResource {
    key
    value
  }
`;

export const itemNavigationFragment = `
fragment itemNavigationFragment on ItemNavigation {
    sys {
      id
    }
    title
    navigateTo {
      __typename
      ...newsListFragment
      ...productListFragment
      ...referenceListFragment
      ...pageListFragment
    }
    externalUrl
    logo {
      ...assetFragment
    }
    subNavigationCollection(limit:9) {
      total
      skip
      limit
      items {
        sys {
          id
        }
        title
        navigateTo {
          __typename
          ...newsListFragment
          ...productListFragment
          ...referenceListFragment
          ...pageListFragment
        }
        externalUrl
        logo {
          ...assetFragment
        }
        subNavigationCollection(limit:9) {
          total
          skip
          limit
          items {
            sys {
              id
            }
            title
            navigateTo {
              __typename
              ...newsListFragment
              ...productListFragment
              ...referenceListFragment
              ...pageListFragment
            }
            externalUrl
            logo {
              ...assetFragment
            }
            subNavigationCollection(limit:9) {
              total
              skip
              limit
              items {
                sys {
                  id
                }
                title
                navigateTo {
                  __typename
                  ...newsListFragment
                  ...productListFragment
                  ...referenceListFragment
                  ...pageListFragment
                }
                externalUrl
                logo {
                  ...assetFragment
                }
              }
            }
          }
        }
      }
    }
  }
`;
