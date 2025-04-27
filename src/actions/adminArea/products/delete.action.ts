import { sendRequest } from "@utils/api.utils";

export default async function deleteAction(formData: FormData) {
  const id = formData.get("id") as string;
  const res = await sendRequest<IBackendResponse<null>>({
    url: `/products/${id}`,
    method: "DELETE",
  });
  return res;
}
