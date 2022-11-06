/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps } from "next";
import { useResourceProvider } from "../components/stores/resource";
import { useEffect } from "react";
import { useImageProvider } from "../components/stores/image";
import { IPageDataProps } from "../components/interfaces/contentful";
import ContentfulApi from "../components/apis/contentfulApi";
import { withLayout } from "../components/hocs/withLayout";
import SlugBody from "../components/organisms/body";
import { IContentfulPage } from "../components/interfaces/pages";

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
        onur
        <SlugBody bodyCollection={props.page?.bodyCollection} />
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
