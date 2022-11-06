import { ReactElement } from "react";
import Container from "../atoms/container";
import { ItemNavigation } from "../interfaces/common";
import { IPageDataProps } from "../interfaces/contentful";
import { IContentfulPage } from "../interfaces/pages";
import { useImageProvider } from "../stores/image";
import { useResourceProvider } from "../stores/resource";

const Footer = (
  props: IPageDataProps<IContentfulPage>
): ReactElement<any, any> => {
  const { getResource } = useResourceProvider();
  const { getImages } = useImageProvider();

  const bendBody = getImages("footer-body");
  const footerLogo = getImages("footer-logo");

  return (
    <Container className="mx-auto grid max-w-xl grid-cols-2 justify-between gap-y-[2.125rem] py-[1.875rem] md:relative lg:grid-cols-4 lg:gap-x-0 px-2 lg:px-0 lg:!container">
      <>
        {props.footerMenu &&
          props.footerMenu.map((item: ItemNavigation) => {
            return <div key={item?.sys?.id} {...item} />;
          })}
        <div className="md:h-[14.688rem] md:w-[13.563rem] xl:h-[18rem] xl:w-[16.625rem]">
          Footer
        </div>
      </>
    </Container>
  );
};

export default Footer;
