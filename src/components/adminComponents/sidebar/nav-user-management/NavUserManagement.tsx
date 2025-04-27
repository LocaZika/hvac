import { faFileInvoice, faUsers } from "@fortawesome/free-solid-svg-icons";
import NavGroup, { INavGroupItem } from "../nav-group/NavGroup"

const items: INavGroupItem[] = [
  {
    label: "User List",
    path: "/admin/users",
    icon: faUsers,
  },
  {
    label: "Order List",
    path: "/admin/orders",
    icon: faFileInvoice,
  },
];
export default function NavUserManagement() {
  return <NavGroup groupLabel="User Management" items={items} />;
}
