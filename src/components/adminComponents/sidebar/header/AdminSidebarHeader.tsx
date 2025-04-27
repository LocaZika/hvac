'use client'
import Link from "next/link";
import Image from "next/image";
import logo from "@public/imgs/logo.png";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@components/ui/sidebar";
export default function AdminSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]"
        >
          <Link href={'/admin'}>
            <Image src={logo} alt="logo" priority />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
