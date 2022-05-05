import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import notion from "../client";

export async function createPage(
  parentDatabeseId: string,
  pageTitle: string
): Promise<CreatePageResponse> {
  return notion.pages.create({
    parent: {
      database_id: parentDatabeseId,
    },
    // TODO: Create arbitrary content page
    properties: {
      Name: {
        title: [
          {
            text: {
              content: pageTitle,
            },
          },
        ],
      },
    },
  });
}
