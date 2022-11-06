/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps } from "next";
import { useEffect } from "react";
import ContentfulApi from "../components/apis/contentfulApi";
import { withLayout } from "../components/hocs/withLayout";
import { ItemResource } from "../components/interfaces/common";
import {
  IAsset,
  IImage,
  IPageDataProps,
} from "../components/interfaces/contentful";
import { IContentfulPage } from "../components/interfaces/pages";
import { useImageProvider } from "../components/stores/image";
import { useResourceProvider } from "../components/stores/resource";

const Custom404 = (props: IPageDataProps<IContentfulPage>): JSX.Element => {
  const { setResourceList, getResource } = useResourceProvider();
  const { setImageList } = useImageProvider();
  const { getImages } = useImageProvider();
  const image = getImages("error-page-figure");

  const FullPage = withLayout(() => {
    return <div>404 - Not found</div>;
  }, props);

  useEffect(() => {
    setResourceList(props.resources as ItemResource[]);
    setImageList(props.assets as IImage[]);
  }, []);

  return <FullPage />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      // menu: (await ContentfulApi.getMenuByTitle("main-menu")) ?? null,
      // secondaryMenu:
      //   (await ContentfulApi.getMenuByTitle("secondary-menu")) ?? null,
      // footerMenu: (await ContentfulApi.getMenuByTitle("footer")) ?? null,
      // assets: await ContentfulApi.getAssetByTitles([
      //   "footer-logo",
      //   "header-logo",
      //   "error-page-figure",
      // ]),
      // resources: await ContentfulApi.getAllResources(),
    },
  };
};

export default Custom404;
