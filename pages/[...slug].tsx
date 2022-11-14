/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import ContentfulApi from "../components/apis/contentfulApi";
import { withLayout } from "../components/hocs/withLayout";
import {
  IContentfulBase,
  IPageDataProps,
} from "../components/interfaces/contentful";
import { IContentfulPage, IProductPages } from "../components/interfaces/pages";
import ComponentResolver from "../components/organisms/componentResolver";
import ProductResolver from "../components/organisms/productResolver";
import { useImageProvider } from "../components/stores/image";
import { useResourceProvider } from "../components/stores/resource";

export default function PageWrapper(
  props: IPageDataProps<IContentfulPage>
): JSX.Element {
  const { setResourceList } = useResourceProvider();
  const { setImageList } = useImageProvider();
  useEffect(() => {
    setResourceList(props.resources || []);
    setImageList(props.assets || []);
  }, []);

  switch (props.page?.pageType) {
    case "page":
      const FullPage = withLayout(() => {
        return (
          <>
            {props?.page?.collection?.items.map(
              (component: IContentfulBase) => {
                return (
                  <ComponentResolver key={component.sys?.id} {...component} />
                );
              }
            )}
          </>
        );
      }, props);
      return <FullPage />;
    case "news":
      const NewsPage = withLayout(() => {
        return (
          <>
            {props?.page?.collection?.items.map(
              (component: IContentfulBase) => {
                return (
                  <ComponentResolver key={component.sys?.id} {...component} />
                );
              }
            )}
          </>
        );
      }, props);
      return <NewsPage />;
    case "product":
      const ProductPage = withLayout(() => {
        return <ProductResolver {...(props.page as IProductPages)} />;
      }, props);
      return <ProductPage />;
    case "reference":
      const ReferencePage = withLayout(() => {
        return (
          <>
            {props?.page?.collection?.items.map(
              (component: IContentfulBase) => {
                return (
                  <ComponentResolver key={component.sys?.id} {...component} />
                );
              }
            )}
          </>
        );
      }, props);
      return <ReferencePage />;
    default:
      const NotFound = withLayout(() => {
        return <>Page type not found</>;
      }, props);
      return <NotFound />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await ContentfulApi.getAllPages();

  return {
    paths: pages
      .filter((page: IContentfulPage) => page.slug !== "" && page.slug !== null)
      .map((page: IContentfulPage) => ({
        params: { slug: page.slug?.split("/") },
      })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await ContentfulApi.getPageData(
    (params?.slug as string[]).join("/")
  );

  if (data === undefined || data.page === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: data,
  };
};
