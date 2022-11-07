import Container from "../atoms/container";
import NavigationLink from "../atoms/navigationLink";
import { IComponentPageHeader } from "../interfaces/components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentPageHeader(
  props: IComponentPageHeader
): JSX.Element {
  return (
    <Container
      isFull={true}
      className={classNames("pt-40")}
      style={
        props.backgroundCollection.items?.[0] && {
          height: `${
            props.backgroundCollection.items?.[0].height &&
            props.backgroundCollection.items?.[0].height !== 0 &&
            props.backgroundCollection.items?.[0].height < 500
              ? props.backgroundCollection.items?.[0].height + "px"
              : "unset"
          }`,
          background: `url(${props.backgroundCollection.items?.[0].url}) left bottom no-repeat`,
        }
      }
    >
      <>
        <h2>{props.headline}</h2>
        <h3>{props.tagline}</h3>
        <NavigationLink
          link={props.ctaNavigateTo}
          external={props.ctaExternalUrl}
        >
          {props.ctaButtonText}
        </NavigationLink>
        {props.ctaBox && <p>{props.ctaBox.__typename}</p>}
      </>
    </Container>
  );
}
