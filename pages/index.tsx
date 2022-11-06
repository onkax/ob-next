/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps } from "next";
import { useResourceProvider } from "../components/stores/resource";
import { useEffect } from "react";
import { useImageProvider } from "../components/stores/image";
import {
  IContentfulBase,
  IPageDataProps,
} from "../components/interfaces/contentful";
import ContentfulApi from "../components/apis/contentfulApi";
import { withLayout } from "../components/hocs/withLayout";
import { IContentfulPage } from "../components/interfaces/pages";
import ComponentResolver from "../components/organisms/componentResolver";

export const Index = (props: IPageDataProps<IContentfulPage>): JSX.Element => {
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
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await ContentfulApi.getPageData(),
  };
};

export default Index;
