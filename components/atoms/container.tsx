import { CSSProperties } from "react";
import { ISidebarBase } from "../interfaces/common";
import { IContentfulItemCollection } from "../interfaces/contentful";
import { ISidebarAssetList } from "../interfaces/sidebars";
import { HomeIcon } from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Container({
  children,
  className = "",
  id,
  style,
  isFull = false,
  aside,
  breadCrumb = "",
}: {
  children: JSX.Element | JSX.Element[] | undefined;
  className?: string;
  id?: string | undefined;
  style?: CSSProperties | undefined;
  isFull?: boolean;
  aside?: IContentfulItemCollection<ISidebarBase>;
  breadCrumb?: string;
}): JSX.Element {
  return (
    <section>
      <div
        className={classNames(
          isFull ? "p-4 min-h-screen" : "om:px-4 md:container",
          className,
          "flex flex-col gap-y-8"
        )}
        style={style}
        id={id}
      >
        {breadCrumb !== "" && (
          <nav className="basis-full relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
              <nav
                className="bg-grey-light rounded-md w-full"
                aria-label="breadcrumb"
              >
                <ol className="list-reset flex">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      <HomeIcon className="stroke-primary fill-white h-6 w-6" />
                    </a>
                  </li>
                  {breadCrumb.split(",").map((crumb: string) => {
                    return (
                      <>
                        <li>
                          <span className="text-gray-500 mx-2">/</span>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {crumb}
                          </a>
                        </li>
                      </>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </nav>
        )}
        <div className={classNames("flex flex-row gap-16")}>
          <article
            className={classNames(aside && aside.total > 0 ? "basis-8/12" : "")}
          >
            {children}
          </article>
          {aside && aside.total > 0 && (
            <aside
              className={classNames(
                aside && aside.total > 0 ? "basis-4/12" : ""
              )}
            >
              <>
                {/* todo: sidebar resolver eklenmeli */}
                {aside.items.map((item: ISidebarBase) => {
                  return (
                    <div key={item.sys?.id}>
                      {(item as ISidebarAssetList).title}
                    </div>
                  );
                })}
              </>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
