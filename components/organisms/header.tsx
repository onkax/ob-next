import { useEffect, useState } from "react";
import { IImage } from "../interfaces/contentful";
import NavigationLink from "../atoms/navigationLink";
import { ItemNavigation } from "../interfaces/common";
import Asset from "../atoms/asset";
import { Bars4Icon } from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({
  menu,
}: {
  menu: ItemNavigation;
}): JSX.Element {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeBackground);
  });

  const openMenu = () => {
    // todo: menu aç kapa
  };

  return (
    <div
      className={classNames(
        "min-h-[80px] transition flex flex-row px-2",
        navbar ? "bg-white drop-shadow-lg" : "bg-transparent"
      )}
    >
      <div className={classNames("md:basis-3/12")}>
        <Asset image={menu?.logo as IImage} showThumb={true} />
      </div>
      <div
        className={classNames(
          "md:container om:hidden basis-9/12 self-center flex flex-row gap-10 justify-end"
        )}
      >
        {menu &&
          menu.subNavigationCollection?.items.map((item: ItemNavigation) => {
            return (
              <div key={item.sys?.id} className={classNames("my-7")}>
                <NavigationLink
                  link={item.navigateTo}
                  external={item.externalUrl}
                  className={classNames()}
                >
                  {item.title}
                </NavigationLink>
              </div>
            );
          })}
      </div>
      <div className={classNames("md:hidden self-center ml-auto")}>
        <button
          onClick={() => {
            openMenu();
          }}
        >
          <Bars4Icon className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}
