export async function sendRequest<T>(requestOptions: IRequest) {
  let url = process.env.DB_SERVER + requestOptions.url;
  const {
    method,
    headers,
    body,
    nextOptions,
  } = requestOptions;
  const options = {
    method: method ?? 'GET',
    headers: new Headers({'Content-Type': 'application/json', ...headers}),
    body: body ? JSON.stringify(body) : null,
    ...nextOptions,
  };
  return await fetch(url, options).then(res => {
    if (res.ok) {
      return res.json() as T
    } else {
      return res.json().then(resError => {
        return {
          statusCode: resError.statusCode,
          message: resError.message ?? '',
          error: resError.error ?? '',
        }
      }) as T;
    }
  });
}