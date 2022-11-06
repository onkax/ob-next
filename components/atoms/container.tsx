import { CSSProperties } from "react";
import { ISidebarBase } from "../interfaces/common";
import { IContentfulItemCollection } from "../interfaces/contentful";

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
}: {
  children: JSX.Element | JSX.Element[] | undefined;
  className?: string;
  id?: string | undefined;
  style?: CSSProperties | undefined;
  isFull?: boolean;
  aside?: IContentfulItemCollection<ISidebarBase>;
}): JSX.Element {
  return (
    <section>
      <div
        className={classNames(
          isFull ? "p-4 min-h-[600px]" : "md:container",
          className,
          aside && aside.total > 0 ? "flex flex-row gap-4" : ""
        )}
        style={style}
        id={id}
      >
        <article
          className={classNames(aside && aside.total > 0 ? "basis-8/12" : "")}
        >
          {children}
        </article>
        {aside && aside.total > 0 && (
          <aside
            className={classNames(aside && aside.total > 0 ? "basis-4/12" : "")}
          >
            <>
              {aside.items.map((item: ISidebarBase) => (
                <div key={item.sys?.id}>yan bar</div>
              ))}
            </>
          </aside>
        )}
      </div>
    </section>
  );
}
