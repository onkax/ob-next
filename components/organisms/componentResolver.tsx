import {
  IComponentArticle,
  IComponentDataList,
  IComponentHero,
  IComponentPageHeader,
} from "../interfaces/components";
import { IContentfulBase } from "../interfaces/contentful";
import ComponentArticle from "./componentArticle";
import ComponentDataList from "./componentDataList";
import ComponentHero from "./componentHero";
import ComponentPageHeader from "./componentPageHeader";

export default function ComponentResolver(props: IContentfulBase): JSX.Element {
  switch (props.__typename) {
    case "ComponentPageHeader":
      return <ComponentPageHeader {...(props as IComponentPageHeader)} />;
    case "ComponentHero":
      return <ComponentHero {...(props as IComponentHero)} />;
    case "ComponentDataList":
      return <ComponentDataList {...(props as IComponentDataList)} />;
    case "ComponentArticle":
      return <ComponentArticle {...(props as IComponentArticle)} />;
    default:
      return <p>not developed - {props.__typename}</p>;
  }
}
