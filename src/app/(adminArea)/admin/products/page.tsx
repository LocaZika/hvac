import { AdminProductListProvider } from "@/contexts/AdminProductList.context";
import { AdminBreadcrumbSender } from "@components/adminComponents/breadcrumb/AdminBreadcrumb";
import ProductPage from "@components/adminComponents/productPage/ProductPage";
import { ProductDialogProvider } from "@contexts/ProductDialog.context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product list",
};

export default async function productsPage() {
  return (
    <AdminProductListProvider>
      <ProductDialogProvider>
        <AdminBreadcrumbSender items={[{ title: "Products list" }]} />
        <ProductPage />
      </ProductDialogProvider>
    </AdminProductListProvider>
  );
}
