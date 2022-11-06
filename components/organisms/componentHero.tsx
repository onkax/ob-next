import Container from "../atoms/container";
import NavigationLink from "../atoms/navigationLink";
import { IComponentHero } from "../interfaces/components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Asset from "../atoms/asset";
import { IImage } from "../interfaces/contentful";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentHero(props: IComponentHero): JSX.Element {
  return (
    <Container>
      <h2>{props.headline}</h2>
      <h3>{props.tagline}</h3>
      <div
        className={classNames(
          "flex gap-16",
          props.isImageLeftAligned ? "flex-row" : "flex-row-reverse"
        )}
      >
        <div className={classNames("basis-1/2")}>
          <Asset image={props.media as IImage} />
        </div>
        <div className={classNames("basis-1/2")}>
          {documentToReactComponents(props.desc.json)}
          <NavigationLink
            link={props.ctaNavigateTo}
            external={props.ctaExternalUrl}
          >
            {props.ctaButtonText}
          </NavigationLink>
        </div>
      </div>
    </Container>
  );
}
