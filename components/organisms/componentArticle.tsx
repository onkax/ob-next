import { ReactElement } from "react";
import Container from "../atoms/container";
import { IComponentArticle } from "../interfaces/components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentArticle(
  props: IComponentArticle
): ReactElement<any, any> {
  return (
    <Container className={classNames("mb-8")} aside={props.asideCollection}>
      <h2>{props.title}</h2>
    </Container>
  );
}
