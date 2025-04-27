"use server";

import { TCarItemDetail } from "@/types/server";
import { sendRequest } from "@utils/api.utils";

export default async function addAction(
  formData: FormData,
): Promise<IBackendResponse<TCarItemDetail>> {
  const data = Object.fromEntries(formData.entries());
  delete data.imgs;
  delete data.detailImgs;
  return await sendRequest<IBackendResponse<TCarItemDetail>>({
    url: "/products",
    method: "POST",
    body: {
      ...data,
      price: parseFloat(formData.get("price") as string),
      hp: parseFloat(formData.get("hp") as string),
      model: parseFloat(formData.get("model") as string),
      mileage: parseFloat(formData.get("mileage") as string),
    },
  });
}
