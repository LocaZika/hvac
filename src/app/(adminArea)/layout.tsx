import "@/app/globals.scss";
import { Lato } from "next/font/google";
import type { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { AdminSidebar } from "@components/adminComponents/sidebar/AdminSidebar";
import { Separator } from "@radix-ui/react-separator";
import AdminBreadcrumb from "@components/adminComponents/breadcrumb/AdminBreadcrumb";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AdminBreadcrumbProvider } from "@/contexts/AdminBreadcrumb.context";
import ToastProvider from "@providers/ToastProvider";

config.autoAddCss = false;

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "HVAC Admin Panel", template: "%s | HVAC Admin Panel" },
  description: "HVAC Admin Panel",
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="../../imgs/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className={lato.className}>
        <ToastProvider>
          <SidebarProvider>
            <AdminBreadcrumbProvider>
              <AdminSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="text-lg" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <AdminBreadcrumb />
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
                </div>
              </SidebarInset>
            </AdminBreadcrumbProvider>
          </SidebarProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
