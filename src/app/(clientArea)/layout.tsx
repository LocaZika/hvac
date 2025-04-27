import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@styles/reset.scss";
import "../globals.scss";
import Footer from "@components/layout/footer/Footer";
import Header from "@components/layout/header/Header";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { themeConfig } from "../theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import { sendRequest } from "@utils/api.utils";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { TLayout } from "@/types/server";

config.autoAddCss = false;
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "HVAC", template: "%s | HVAC" },
  description: "HVAC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await sendRequest<IBackendResponse<TLayout>>({
    url: "/layout",
  });
  const layoutData = res.data;
  const headerData = {
    navbar: layoutData.navbar,
    contactInfo: layoutData.contactInfo,
  };
  const footerData = {
    contactTitle: layoutData.footer.contactTitle,
    aboutContent: layoutData.footer.aboutContent,
    imgs: layoutData.footer.imgs,
    topCarTypes: layoutData.footer.topCarTypes,
    topCarBrands: layoutData.footer.topCarBrands,
    contactInfo: layoutData.contactInfo,
  };
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/imgs/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className={lato.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={themeConfig}>
            <Header data={headerData} />
            {children}
            <Footer data={footerData} />
            <ToastContainer
              transition={Bounce}
              position="top-right"
              autoClose={2000}
              bodyStyle={{ fontSize: "1.4rem" }}
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/mixitup/3.3.1/mixitup.min.js" />
      </body>
    </html>
  );
}
