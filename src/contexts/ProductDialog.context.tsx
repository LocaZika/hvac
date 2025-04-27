"use client";
import React, { createContext, useContext, useState } from "react";

type TProductDialogState = {
  open?: boolean;
  buttonContent: string | React.ReactNode;
  title: string;
  description: string;
};

const initialState: TProductDialogState = {
  open: false,
  buttonContent: "",
  description: "",
  title: "",
};

type TProductDialogContext =
  | [
      state: TProductDialogState,
      setState: React.Dispatch<React.SetStateAction<TProductDialogState>>,
    ]
  | null;

export const ProductDialogContext = createContext<TProductDialogContext>(null);

export const ProductDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<TProductDialogState>(initialState);
  return (
    <ProductDialogContext.Provider value={[state, setState]}>
      {children}
    </ProductDialogContext.Provider>
  );
};

export const useProductDialog = () => {
  const context = useContext(ProductDialogContext);
  if (!context) {
    throw new Error("useProductDialog must use within ProductDialogProvider");
  }
  return context;
};
