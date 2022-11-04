import { ItemResource, ItemNavigation } from "../interfaces/common";
import {
  IContentfulResponse,
  IContentfulPage,
  IImage,
  IContentfulBase,
  IPageDataProps,
} from "../interfaces/contentful";
import {
  getAllPagesQuery,
  getAllResourcesQuery,
  getAssetQuery,
  getContentByIdQuery,
  getMenuQuery,
  getPageBySlugQuery,
} from "./contentfulQueries";

export default class ContentfulApi {
  private static async callContentful<T>(
    query: string,
    variables?: unknown,
    isPreview?: boolean
  ): Promise<IContentfulResponse<T>> {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENTS_ID}`;
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          isPreview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      return await fetch(fetchUrl, fetchOptions).then((response: Response) => {
        if ((response as IContentfulResponse<T>).errors !== undefined) {
          console.log(JSON.stringify(response));
        }
        return response.json();
      });
    } catch (error: unknown) {
      throw console.log(error);
    }
  }

  private static async getPageBySlug(
    slug = "home",
    isPreview = false
  ): Promise<IContentfulPage> {
    const response = (await this.callContentful(
      getPageBySlugQuery,
      { slug, isPreview },
      isPreview
    ).catch((error: PromiseLike<void>) =>
      console.log(error)
    )) as IContentfulResponse<IContentfulPage>;
    HandleExternalError(response);
    return response.data.collection.items[0];
  }

  static async getAllPages(): Promise<IContentfulPage[]> {
    const response = (await this.callContentful(
      getAllPagesQuery
    )) as IContentfulResponse<IContentfulPage>;
    HandleExternalError(response);
    return response.data?.collection.items;
  }

  static async getAllResources(): Promise<ItemResource[]> {
    const response = (await this.callContentful(
      getAllResourcesQuery
    )) as IContentfulResponse<ItemResource>;
    return response.data.collection.items;
  }

  static async getMenuByTitle(
    title = "",
    isPreview = false
  ): Promise<ItemNavigation[]> {
    const response = (await this.callContentful(
      getMenuQuery,
      {
        title,
      },
      isPreview
    )) as IContentfulResponse<ItemNavigation>;
    return (
      response?.data?.collection?.items?.[0]?.subItemsCollection?.items || []
    );
  }

  static async getAssetByTitles(titles: string[] = []): Promise<IImage[]> {
    const standartAssets = [
      "footer-logo",
      "footer-body",
      "header-logo",
      "video-play",
      "about-us-cheer",
      "video-cover-big",
      "weight-lifter",
    ];
    const title = standartAssets.concat(titles);
    const response = (await this.callContentful(getAssetQuery, {
      title,
    })) as IContentfulResponse<IImage>;
    return response.data.collection.items;
  }

  static async getContentById(
    id: string,
    isPreview = true
  ): Promise<IContentfulBase> {
    const response = (await this.callContentful(
      getContentByIdQuery,
      { id },
      isPreview
    ).catch((error: PromiseLike<void>) =>
      console.log(error)
    )) as IContentfulResponse<IContentfulBase>;

    return response.data.collection.items[0];
  }

  static async getPageData(
    slug = "home",
    isPreview = false
  ): Promise<IPageDataProps<IContentfulPage>> {
    const page = await this.getPageBySlug(slug, isPreview);
    const menu = (await this.getMenuByTitle("main-menu", isPreview)) ?? null;
    const secondaryMenu =
      (await this.getMenuByTitle("secondary-menu", isPreview)) ?? null;
    const footerMenu = (await this.getMenuByTitle("footer", isPreview)) ?? null;
    const resources = await this.getAllResources();
    const assets = await this.getAssetByTitles();

    return { menu, secondaryMenu, footerMenu, resources, page, assets };
  }
}

function HandleExternalError(
  response: IContentfulResponse<IContentfulPage>
): void {
  if (response.data === undefined) console.log(response);
}
