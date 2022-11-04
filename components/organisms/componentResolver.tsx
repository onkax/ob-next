import {
  IContentfulBase,
  IContentfulResponseData,
} from "../interfaces/contentful";

export default function ComponentResolver(props: IContentfulBase): JSX.Element {
  switch (props.__typename) {
    case "ComponentCardList":
      return <>card list</>;
    default:
      return <>not developed</>;
  }
}
