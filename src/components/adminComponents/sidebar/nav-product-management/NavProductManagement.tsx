import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import NavGroup, { INavGroupItem } from "../nav-group/NavGroup"


const items: INavGroupItem[] = [
  {
    label: "Product List",
    path: "/admin/products",
    icon: faBoxes,
  },
];
export default function NavProductManagement() {
  return <NavGroup groupLabel="Product Management" items={items} />
}
