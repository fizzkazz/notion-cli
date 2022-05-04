import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import notion from "../client";

export async function retrievePage(pageId: string): Promise<GetPageResponse> {
  return await notion.pages.retrieve({ page_id: pageId });
}
