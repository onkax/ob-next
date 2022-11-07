import Asset from "../atoms/asset";
import NavigationLink from "../atoms/navigationLink";
import { ItemNavigation } from "../interfaces/common";
import { IImage, IPageDataProps } from "../interfaces/contentful";
import { IContentfulPage } from "../interfaces/pages";
import { useImageProvider } from "../stores/image";
import { useResourceProvider } from "../stores/resource";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Footer = ({ menu }: { menu: ItemNavigation }): JSX.Element => {
  const { getResource } = useResourceProvider();
  const { getImages } = useImageProvider();

  const bendBody = getImages("footer-body");
  const footerLogo = getImages("footer-logo");

  return (
    <div
      className={classNames(
        "md:container min-h-fit flex flex-wrap md:flex-nowrap md:flex-row gap-12 px-4 md:justify-around"
      )}
    >
      {menu &&
        menu.subNavigationCollection?.items.map((item: ItemNavigation) => {
          return (
            <div key={item.sys?.id} className={classNames("my-4 basis-1/4")}>
              <NavigationLink
                link={item.navigateTo}
                external={item.externalUrl}
                className={classNames()}
              >
                {item.title}
              </NavigationLink>
              <hr />
              {item.subNavigationCollection?.total > 0 && (
                <div className="flex flex-col">
                  {item.subNavigationCollection.items.map(
                    (sub: ItemNavigation) => {
                      return (
                        <NavigationLink
                          key={sub.sys?.id}
                          link={sub.navigateTo}
                          external={sub.externalUrl}
                          className={classNames("")}
                        >
                          {sub.title}
                        </NavigationLink>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      <div className={classNames("my-4 basis-1/4")}>
        <Asset image={menu?.logo as IImage} />
      </div>
    </div>
  );
};

export default Footer;
