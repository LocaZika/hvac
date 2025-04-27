'use server'

import { sendRequest } from "@utils/api.utils";

export default async function requestCallbackAction(formData: FormData): Promise<IBackendResponse<null>> {
  const requestCallback = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
  };
  const res = await sendRequest<IBackendResponse<null>>({
    url: '/sendmail/requestCallback',
    method: 'POST',
    body: requestCallback,
  });
  return res;
}