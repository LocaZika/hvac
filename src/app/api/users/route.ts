import { TUser } from "@/types/server";
import { sendRequest } from "@utils/api.utils";
import { NextRequest, NextResponse } from "next/server";
import queryString from "query-string";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(
    searchParams
      .entries()
      .map(([key, value]) => [key, value.toLocaleLowerCase()]),
  );
  let url = `/users/customers?${queryString.stringify(queryParams)}`;
  const res = await sendRequest<IBackendResponse<TUser[]>>({
    url,
  });
  if (res.statusCode === 404) {
    return new NextResponse("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return NextResponse.json(res);
}
