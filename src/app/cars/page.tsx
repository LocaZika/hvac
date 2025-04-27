import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import { sendRequest } from "@utils/api.utils";
import CarsPage from "@components/carsPage/CarsPage.component";
import { Metadata } from "next";
import { TCarspage } from "@/types/server";

export const metadata: Metadata = {
  title: "Car list",
  description: "This is a list of cars available in our inventory.",
  keywords: ["car", "list", "car list"],
};

export default async function carsPage() {
  const carspageRes = await sendRequest<IBackendResponse<TCarspage>>({
    url: "/carpage",
  });
  const { filterForm } = carspageRes.data;
  return (
    <>
      <Breadcrumb items="car list" />
      <CarsPage filterForm={filterForm} />
    </>
  );
}
