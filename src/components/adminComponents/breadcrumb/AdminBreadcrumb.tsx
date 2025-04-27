'use client'
import { IBreadcrumbItem } from "@components/breadcrumb/Breadcrumb";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@components/ui/breadcrumb";
import { useAdminBreadcrumb } from "@/contexts/AdminBreadcrumb.context";
import { useEffect } from "react";

export function AdminBreadcrumbSender({items}: {items: IBreadcrumbItem[]}) {
  const { setBreadcrumbs } = useAdminBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([...items]);
  }, [setBreadcrumbs]);

  return <></>;
}

export default function AdminBreadcrumb() {
  const { breadcrumbs } = useAdminBreadcrumb();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={breadcrumbs[0] ? breadcrumbs[0].path : '/admin'}>
            Admin Panel
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {
              breadcrumbs[0] ?  breadcrumbs[0].title : ''
            }
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}