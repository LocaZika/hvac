import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NavAnalysis from "./nav-analysis/NavAnalysis";
import AdminSidebarHeader from "./header/AdminSidebarHeader";
import NavProductManagement from "./nav-product-management/NavProductManagement";
import NavUserManagement from "./nav-user-management/NavUserManagement";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AdminSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavAnalysis />
        <NavProductManagement />
        <NavUserManagement />
      </SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  )
}
