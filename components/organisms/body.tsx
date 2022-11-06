import { IContentfulBase } from "../interfaces/contentful";
import { IContentfulPage } from "../interfaces/pages";
import ComponentResolver from "./componentResolver";

export default function SlugBody(props: IContentfulPage): JSX.Element {
  return (
    <>
      {props.collection?.items.map((component: IContentfulBase) => {
        return <ComponentResolver key={component.sys?.id} {...component} />;
      })}
    </>
  );
}
