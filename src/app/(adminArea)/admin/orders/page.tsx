import { AdminBreadcrumbSender } from "@components/adminComponents/breadcrumb/AdminBreadcrumb";
import OrderPage from "@components/adminComponents/orderPage/OrderPage";
import { AdminOrderListProvider } from "@contexts/AdminOrderList.context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order list",
};

export default async function orderPage() {
  return (
    <AdminOrderListProvider>
      <AdminBreadcrumbSender items={[{ title: "Order list" }]} />
      <OrderPage />
    </AdminOrderListProvider>
  );
}
