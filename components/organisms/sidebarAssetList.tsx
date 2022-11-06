import { ISidebarBase } from "../interfaces/common";

export default function SidebarAssetList(props: ISidebarBase): JSX.Element {
  return <>{props.__typename}</>;
}
