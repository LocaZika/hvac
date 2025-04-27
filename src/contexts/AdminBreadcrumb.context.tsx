'use client'
import { IBreadcrumbItem } from "@components/breadcrumb/Breadcrumb";
import { createContext, useContext, useState } from "react";

interface IAdminBreadcrumbContext {
  breadcrumbs: IBreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: IBreadcrumbItem[]) => void;
}

const AdminBreadcrumbContext = createContext<IAdminBreadcrumbContext | undefined>(undefined);

export const AdminBreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([]);

  return (
    <AdminBreadcrumbContext.Provider value={{breadcrumbs, setBreadcrumbs}}>
      {children}
    </AdminBreadcrumbContext.Provider>
  );
};

export const useAdminBreadcrumb = () => {
  const context = useContext(AdminBreadcrumbContext);
  if (!context) {
    throw new Error('useAdminBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};