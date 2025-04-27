"use client";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        transition={Bounce}
        position="top-right"
        autoClose={2000}
        bodyStyle={{ fontSize: "14px" }}
      />
    </>
  );
}
