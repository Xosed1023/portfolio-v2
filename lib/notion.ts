import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { WebProject } from "./web-projects";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

type Props = PageObjectResponse["properties"];

function text(prop: Props[string] | undefined): string {
  if (!prop) return "";
  if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text ?? "";
  if (prop.type === "title") return prop.title[0]?.plain_text ?? "";
  return "";
}

function url(prop: Props[string] | undefined): string | undefined {
  if (!prop || prop.type !== "url") return undefined;
  return prop.url ?? undefined;
}

function select(prop: Props[string] | undefined): string {
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name ?? "";
}

function multiSelect(prop: Props[string] | undefined): string[] {
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((s) => s.name);
}

export async function getWebProjects(): Promise<WebProject[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_WEBPROJECTS_DB!,
    sorts: [{ property: "order", direction: "ascending" }],
    filter: { property: "active", checkbox: { equals: true } },
  });

  return res.results
    .filter((p): p is PageObjectResponse => p.object === "page" && "properties" in p)
    .map((page) => {
      const p = page.properties;
      const status = select(p.status);

      return {
        id: page.id,
        name: text(p.name),
        client: text(p.client),
        category: text(p.category),
        description: text(p.description),
        url: url(p.url),
        github: url(p.github),
        status: (["live", "development", "soon"].includes(status)
          ? status
          : "soon") as WebProject["status"],
        tech: multiSelect(p.tech),
        visual: text(p.visual) || "default",
        image: text(p.image) || undefined,
        year: text(p.year),
        color: text(p.color) || "#c9a96e",
      };
    });
}
