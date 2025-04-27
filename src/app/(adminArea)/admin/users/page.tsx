import { AdminBreadcrumbSender } from "@components/adminComponents/breadcrumb/AdminBreadcrumb";
import UserPage from "@components/adminComponents/userPage/UserPage";
import { AdminUserListProvider } from "@contexts/AdminUserList.context";

export default function userPage() {
  return (
    <AdminUserListProvider>
      <AdminBreadcrumbSender items={[{ title: "User list" }]} />
      <UserPage />
    </AdminUserListProvider>
  );
}
