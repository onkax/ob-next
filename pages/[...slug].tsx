/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import ContentfulApi from "../components/apis/contentfulApi";
import { withLayout } from "../components/hocs/withLayout";
import {
  IContentfulBase,
  IPageDataProps,
} from "../components/interfaces/contentful";
import { IContentfulPage } from "../components/interfaces/pages";
import ComponentResolver from "../components/organisms/componentResolver";
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

  const FullPage = withLayout(() => {
    return (
      <>
        {props?.page?.collection?.items.map((component: IContentfulBase) => {
          return <ComponentResolver key={component.sys?.id} {...component} />;
        })}
      </>
    );
  }, props);

  return <FullPage />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await ContentfulApi.getAllPages();
  return {
    paths: pages
      .filter((page: IContentfulPage) => page.slug !== "" && page.slug !== null)
      .map((page: IContentfulPage) => ({
        params: { slug: page.slug?.split("/") },
      })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: await ContentfulApi.getPageData(
      (params?.slug as string[]).join("/")
    ),
  };
};
