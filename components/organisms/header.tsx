import { useEffect, useState } from "react";
import { IContentfulPage } from "../interfaces/pages";
import { IPageDataProps } from "../interfaces/contentful";
import NavigationLink from "../atoms/navigationLink";
import { ItemNavigation } from "../interfaces/common";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({
  menu,
}: {
  menu: ItemNavigation[];
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

  return (
    <div
      className={classNames(
        "min-h-[80px] transition",
        navbar ? "bg-white drop-shadow-lg" : "bg-transparent"
      )}
    >
      <div className={classNames("md:container")}>
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
    </div>
  );
}
