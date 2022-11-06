import { ReactElement } from "react";
import Container from "../atoms/container";
import { IComponentDataList } from "../interfaces/components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentDataList(
  props: IComponentDataList
): ReactElement<any, any> {
  return (
    <Container className={classNames(props.slideOnMobile ? "" : "")}>
      <p>ComponentDataList</p>
    </Container>
  );
}
