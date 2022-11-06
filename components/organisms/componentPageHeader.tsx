import { ReactElement } from "react";
import Container from "../atoms/container";
import { IComponentPageHeader } from "../interfaces/components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentPageHeader(
  props: IComponentPageHeader
): ReactElement<any, any> {
  return (
    <Container
      isFull={true}
      className={classNames()}
      style={
        props.backgroundCollection.items?.[0] && {
          height: `${
            props.backgroundCollection.items?.[0].height &&
            props.backgroundCollection.items?.[0].height !== 0 &&
            props.backgroundCollection.items?.[0].height < 500
              ? props.backgroundCollection.items?.[0].height + "px"
              : "unset"
          }`,
          background: `url(${props.backgroundCollection.items?.[0].url}) center bottom no-repeat`,
        }
      }
    >
      <>ComponentPageHeader</>
    </Container>
  );
}
