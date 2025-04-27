"use server";
import { TCarItemDetail } from "@/types/server";
import { sendRequest } from "@utils/api.utils";
import queryString from "query-string";

interface ISearchActionParams {
  page: number;
  q?: string;
  sortBy: "asc" | "desc";
}

export default async function searchAction(formData: FormData) {
  const keywords = formData.get("search") as string;
  const params: ISearchActionParams = {
    page: 1,
    sortBy: "asc",
  };
  if (keywords && keywords.trim() !== "") {
    params.q = keywords;
  }
  const res = await sendRequest<IBackendResponse<TCarItemDetail[]>>({
    url: `/products?${queryString.stringify(params)}`,
  });
  return res;
}
