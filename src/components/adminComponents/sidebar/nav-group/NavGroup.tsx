import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@components/ui/sidebar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Link from "next/link";

export interface INavGroupItem {
  path: string;
  label: string;
  icon?: IconProp;
}

interface INavGroupProp {
  groupLabel: string;
  items: INavGroupItem[];
}
export default function NavGroup({groupLabel, items}: INavGroupProp) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {
          items.map(({label, path, icon}, index) => (
            <Collapsible key={index} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={label} className="text-[20px]">
                    {
                      icon ? (<FontAwesomeIcon icon={icon} />) : null
                    }
                    <Link href={path}>
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          ))
        }
      </SidebarMenu>
    </SidebarGroup>
  );
}
