import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Container from "../atoms/container";
import { IProductPages } from "../interfaces/pages";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(",");
}

export default function ProductResolver(props: IProductPages): JSX.Element {
  return (
    <Container
      aside={props.asideCollection}
      breadCrumb={classNames("Ürünler", props.title)}
    >
      <>
        {props.title}
        {props.summary}
        {documentToReactComponents(props.textarea.json)}
        {props.slug}
        {props.seo}
        {/* {props.image} */}
        {/* {props.galleryCollection}
      {props.asideCollection} */}
      </>
    </Container>
  );
}
