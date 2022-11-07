import * as contentful from "contentful";
import { NextApiRequest, NextApiResponse } from "next";

let revalidatedList: string[] = [];

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  environment: process.env.CONTENTFUL_ENVIRONMENTS_ID as string,
});

async function extractEntries(
  entry: contentful.EntryCollection<unknown>,
  res: NextApiResponse
): Promise<any> {
  entry.items.forEach(async (i) => {
    if (i.sys.contentType.sys.id === "page") {
      // if it is home, revalidate root too
      if ((i.fields as any)["slug"] === "home") void res.revalidate("/");

      if (revalidatedList.indexOf((i.fields as any)["slug"]) === -1) {
        revalidatedList.push((i.fields as any)["slug"]);
        await res.revalidate("/" + (i.fields as any)["slug"]);
      }
    } else void findEntryRevalidate(i.sys.id, res);
  });
}

async function findEntryRevalidate(
  e: string,
  res: NextApiResponse
): Promise<any> {
  await client.getEntries({ limit: 10, links_to_entry: e }).then(async (e) => {
    await extractEntries(e, res);
  });
}

async function findAssetRevalidate(
  e: string,
  res: NextApiResponse
): Promise<any> {
  await client.getEntries({ limit: 101, links_to_asset: e }).then(async (e) => {
    await extractEntries(e, res);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  try {
    const { id, type } = req.body; //type=asset is only for contentful assets
    const { secret } = req.headers;

    if (id === undefined || secret === undefined)
      return res.status(500).send("Error revalidating");

    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET)
      return res.status(401).json({ message: "Invalid token" });

    let result;
    if (type === "asset")
      result = await findAssetRevalidate(id as string, res)
        .then(() => res.json({ revalidated: true }))
        .finally(() => (revalidatedList = []));
    else
      result = await findEntryRevalidate(id as string, res)
        .then(() => res.json({ revalidated: true }))
        .finally(() => (revalidatedList = []));

    res.end(JSON.stringify(result));
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
