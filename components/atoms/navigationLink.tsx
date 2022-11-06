import { IPageBasedData } from "../interfaces/data";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationLink({
  children,
  link,
  external,
  className = "",
}: {
  children: JSX.Element | JSX.Element[] | string | undefined;
  link: IPageBasedData;
  external?: string;
  className?: string;
}): JSX.Element {
  return (
    <a
      href={link ? "/" + link.slug : external}
      className={classNames(className)}
    >
      {children}
      {/* todo: remove this; */}
      {external && " - " + external}
    </a>
  );
}
