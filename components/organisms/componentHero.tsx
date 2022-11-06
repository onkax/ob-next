import { ReactElement } from "react";
import Container from "../atoms/container";
import { IComponentHero } from "../interfaces/components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentHero(
  props: IComponentHero
): ReactElement<any, any> {
  return (
    <Container className={classNames(props.isImageLeftAligned ? "" : "")}>
      <>ComponentHero</>
    </Container>
  );
}
