"use server";

import { TOrder } from "@/types/server";
import { sendRequest } from "@utils/api.utils";
import queryString from "query-string";

interface ISearchActionParams {
  page: number;
  q?: string;
}
export async function searchAction(formData: FormData) {
  const keywords = formData.get("search") as string;
  const params: ISearchActionParams = {
    page: 1,
  };
  if (keywords && keywords.trim() !== "") {
    params.q = keywords;
  }
  const res = await sendRequest<IBackendResponse<TOrder[]>>({
    url: `/orders?${queryString.stringify(params)}`,
  });
  return res;
}
