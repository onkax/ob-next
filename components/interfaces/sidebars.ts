import { ISidebarBase } from "./common";
import { IAsset, IContentfulItemCollection } from "./contentful";

export interface ISidebarAssetList extends ISidebarBase {
  title: string;
  summary: string;
  assetCollection: IContentfulItemCollection<IAsset>;
}
