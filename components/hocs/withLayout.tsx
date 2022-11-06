/* eslint-disable react/display-name */
import Meta from "../atoms/meta";
import { IPageDataProps } from "../interfaces/contentful";
import {
  IContentfulPage,
  IContentfulPageBase,
  IPageSeo,
} from "../interfaces/pages";
import Footer from "../organisms/footer";
import Headers from "../organisms/headers";

export const withLayout = (
  BodyComponent: React.ComponentType<IPageDataProps<IContentfulPage>>,
  innerProps: IPageDataProps<IContentfulPageBase>
) => {
  return (props: IPageDataProps<IContentfulPageBase>): JSX.Element => {
    return (
      <>
        <Meta {...(innerProps.page?.seo as IPageSeo)} />
        <header className="relative z-50 bg-primary-white">
          <Headers />
        </header>
        <main id="main">
          <BodyComponent {...props} />
        </main>
        <footer>
          <Footer footerMenu={innerProps.footerMenu} />
        </footer>
      </>
    );
  };
};
