import Container from "../atoms/container";
import { IComponentArticle } from "../interfaces/components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useResourceProvider } from "../stores/resource";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentArticle(
  props: IComponentArticle
): JSX.Element {
  const { getResource } = useResourceProvider();

  return (
    <Container
      key={props.sys?.id}
      className={classNames("mb-8")}
      aside={props.asideCollection}
    >
      <h2>{props.title}</h2>
      <h4>{getResource("article.category." + props.category)} </h4>
      <div>{documentToReactComponents(props.textarea.json)}</div>
    </Container>
  );
}
