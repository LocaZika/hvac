'use client'

import { IBreadcrumbItem } from "@components/breadcrumb/Breadcrumb";
import { useState } from "react";

export default function useBreadcrumb(){
  const [breadcrumbItems, setBreadcrumbItems] = useState<IBreadcrumbItem[]>([]);
  return {breadcrumbItems, setBreadcrumbItems};
}