import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import NavGroup, { INavGroupItem } from "../nav-group/NavGroup";

const items: INavGroupItem[] = [{
  label: "Dashboard",
  path: "/admin",
  icon: faChartLine,
}];
export default function NavAnalysis() {
  return <NavGroup groupLabel="Dashboard" items={items} />;
}
