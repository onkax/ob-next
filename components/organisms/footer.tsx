import NavigationLink from "../atoms/navigationLink";
import { ItemNavigation } from "../interfaces/common";
import { IPageDataProps } from "../interfaces/contentful";
import { IContentfulPage } from "../interfaces/pages";
import { useImageProvider } from "../stores/image";
import { useResourceProvider } from "../stores/resource";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Footer = ({ menu }: { menu: ItemNavigation[] }): JSX.Element => {
  const { getResource } = useResourceProvider();
  const { getImages } = useImageProvider();

  const bendBody = getImages("footer-body");
  const footerLogo = getImages("footer-logo");

  return (
    <div className={classNames("md:container min-h-fit")}>
      {menu &&
        menu.map((item: ItemNavigation) => {
          return (
            <NavigationLink
              key={item.sys?.id}
              link={item.navigateTo}
              external={item.externalUrl}
              className={classNames()}
            >
              {item.title}
            </NavigationLink>
          );
        })}
    </div>
  );
};

export default Footer;
