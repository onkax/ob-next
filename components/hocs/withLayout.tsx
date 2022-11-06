/* eslint-disable react/display-name */
import Meta from "../atoms/meta";
import { ItemNavigation } from "../interfaces/common";
import { IPageDataProps } from "../interfaces/contentful";
import {
  IContentfulPage,
  IContentfulPageBase,
  IPageSeo,
} from "../interfaces/pages";
import Footer from "../organisms/footer";
import Header from "../organisms/header";

export const withLayout = (
  BodyComponent: React.ComponentType<IPageDataProps<IContentfulPage>>,
  innerProps: IPageDataProps<IContentfulPageBase>
) => {
  return (props: IPageDataProps<IContentfulPageBase>): JSX.Element => {
    return (
      <>
        <Meta {...(innerProps.page?.seo as IPageSeo)} />
        <header className="sticky top-0">
          <Header menu={innerProps.menu as ItemNavigation[]} />
        </header>
        <main id="main">
          <BodyComponent {...props} />
        </main>
        <footer>
          <Footer menu={innerProps.footerMenu as ItemNavigation[]} />
        </footer>
      </>
    );
  };
};
