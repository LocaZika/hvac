"use server";

import { TUser } from "@/types/server";
import { sendRequest } from "@utils/api.utils";
import queryString from "query-string";

interface ISearchActionParams {
  page: number;
  q?: string;
}

export default async function searchAction(formData: FormData) {
  const keywords = formData.get("search") as string;
  const params: ISearchActionParams = {
    page: 1,
  };
  if (keywords && keywords.trim() !== "") {
    params.q = keywords;
  }
  const res = await sendRequest<IBackendResponse<TUser[]>>({
    url: `/users/customers?${queryString.stringify(params)}`,
  });
  return res;
}
