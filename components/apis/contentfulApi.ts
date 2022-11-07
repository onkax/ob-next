import { ItemResource, ItemNavigation } from "../interfaces/common";
import {
  IContentfulResponse,
  IImage,
  IContentfulBase,
  IPageDataProps,
} from "../interfaces/contentful";
import { IContentfulPage, IContentfulPageBase } from "../interfaces/pages";
import {
  GetAllPagesQuery,
  GetAllResourcesQuery,
  GetAssetByTitlesQuery,
  GetContentByIdQuery,
  GetMenuByTitleQuery,
  GetPageBySlugQuery,
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

    return await fetch(fetchUrl, fetchOptions).then((response: Response) => {
      return response.json();
    });
  }

  private static async getPageBySlug(
    slug = "home",
    isPreview = false
  ): Promise<IContentfulPage | undefined> {
    const response = (await this.callContentful(
      GetPageBySlugQuery,
      { slug, isPreview },
      isPreview
    )) as IContentfulResponse<IContentfulPage>;
    HandleExternalError(response);

    let page = response.data?.pages?.items.pop();
    if (page !== undefined)
      page.pageType = response.data.pages.total === 1 ? "page" : undefined;

    let news = response.data?.news?.items.pop();
    if (news !== undefined)
      news.pageType = response.data.news.total === 1 ? "news" : undefined;

    let product = response.data?.products?.items.pop();
    if (product !== undefined)
      product.pageType =
        response.data.products.total === 1 ? "product" : undefined;

    let reference = response.data?.references?.items.pop();
    if (reference !== undefined)
      reference.pageType =
        response.data.references.total === 1 ? "reference" : undefined;

    return page || news || product || reference;
  }

  static async getAllPages(): Promise<IContentfulPageBase[]> {
    const response = (await this.callContentful(
      GetAllPagesQuery
    )) as IContentfulResponse<IContentfulPageBase>;
    HandleExternalError(response);
    const { pages, news, products, references } = response.data;
    return [
      ...pages?.items,
      ...news?.items,
      ...products?.items,
      ...references?.items,
    ];
  }

  static async getAllResources(): Promise<ItemResource[]> {
    const response = (await this.callContentful(
      GetAllResourcesQuery
    )) as IContentfulResponse<ItemResource>;
    HandleExternalError(response);
    return response.data?.collection?.items;
  }

  static async getMenuByTitle(
    title = "",
    isPreview = false
  ): Promise<ItemNavigation> {
    const response = (await this.callContentful(
      GetMenuByTitleQuery,
      {
        title,
      },
      isPreview
    )) as IContentfulResponse<ItemNavigation>;
    HandleExternalError(response);
    return response?.data?.collection?.items?.pop() as ItemNavigation;
  }

  static async getAssetByTitles(titles: string[] = []): Promise<IImage[]> {
    const standartAssets = ["gym"];
    const title = [...standartAssets, ...titles];
    const response = (await this.callContentful(GetAssetByTitlesQuery, {
      title,
    })) as IContentfulResponse<IImage>;
    HandleExternalError(response);
    return response.data?.collection?.items;
  }

  static async getContentById(
    id: string,
    isPreview = true
  ): Promise<IContentfulBase> {
    const response = (await this.callContentful(
      GetContentByIdQuery,
      { id },
      isPreview
    )) as IContentfulResponse<IContentfulBase>;
    HandleExternalError(response);
    return response.data?.collection?.items[0];
  }

  static async getPageData(
    slug = "home",
    isPreview = false
  ): Promise<IPageDataProps<IContentfulPage>> {
    const page = await this.getPageBySlug(slug, isPreview);
    const menu = (await this.getMenuByTitle("main-nav", isPreview)) ?? null;
    const secondaryMenu =
      (await this.getMenuByTitle("extra-nav", isPreview)) ?? null;
    const footerMenu =
      (await this.getMenuByTitle("footer-nav", isPreview)) ?? null;
    const resources = await this.getAllResources();
    const assets = await this.getAssetByTitles();

    return { menu, secondaryMenu, footerMenu, resources, page, assets };
  }
}

function HandleExternalError(
  response: IContentfulResponse<IContentfulBase>
): void {
  if (response.data === undefined) {
    console.log(response.errors);
  }
}
