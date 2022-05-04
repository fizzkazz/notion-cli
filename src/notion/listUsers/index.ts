import { ListUsersResponse } from "@notionhq/client/build/src/api-endpoints";
import notion from "../client";

export async function listUsers(): Promise<ListUsersResponse> {
  return await notion.users.list({});
}
