import Meta from "../atoms/meta";
import {
  IPageDataProps,
  IContentfulPage,
  IContentfulPageBase,
  IPageSeo,
} from "../interfaces/contentful";

export const withLayout = (
  BodyComponent: React.ComponentType<IPageDataProps<IContentfulPage>>,
  innerProps: IPageDataProps<IContentfulPageBase>
) => {
  return (props: IPageDataProps<IContentfulPageBase>): JSX.Element => {
    return (
      <>
        <Meta {...(innerProps.page?.seo as IPageSeo)} />
        <header className="relative z-50 bg-primary-white">
          {/* <Headers
            menu={innerProps.menu}
            secondaryMenu={innerProps.secondaryMenu}
          /> */}
        </header>
        <main id="main">
          <BodyComponent {...props} />
        </main>
        <footer>{/* <Footer footerMenu={innerProps.footerMenu} /> */}</footer>
      </>
    );
  };
};
