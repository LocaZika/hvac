"use client";
import { OnlyOne, TCarItemDetail } from "@/types/server";
import { TProductData } from "@components/adminComponents/dialog/ProductDialog";
import { createContext, useContext, useReducer } from "react";

export enum EAdminProductListActionKind {
  setProducts = "setProducts",
  setSelectedProduct = "setSelectedProduct",
  setPage = "setPage",
  setTotalPages = "setTotalPages",
  setSearch = "setSearch",
}
export type TProduct = TProductData | TCarItemDetail | null;

interface IAdminProductListState {
  products: TCarItemDetail[];
  selectedProduct: TProduct;
  page: number;
  totalPages: number;
  search: string;
}

interface IAdminProductListContext {
  state: IAdminProductListState;
  dispatch: React.Dispatch<IAdminProductListAction>;
}

interface IAdminProductListAction {
  type: EAdminProductListActionKind;
  payload: Partial<IAdminProductListState>;
}

const initialState: IAdminProductListState = {
  products: [],
  selectedProduct: {
    id: 0,
    name: "",
    brand: "",
    price: 0,
    type: "",
    hp: 0,
    model: 2000,
    mileage: 10,
    vin: "",
    stock: "",
  } as TProduct,
  page: 1,
  totalPages: 1,
  search: "",
};

function reducer(
  state: IAdminProductListState,
  action: IAdminProductListAction,
): IAdminProductListState {
  switch (action.type) {
    case EAdminProductListActionKind.setProducts:
      return { ...state, products: action.payload.products || [] };
    case EAdminProductListActionKind.setPage:
      return { ...state, page: action.payload.page || 1 };
    case EAdminProductListActionKind.setTotalPages:
      return { ...state, totalPages: action.payload.totalPages || 1 };
    case EAdminProductListActionKind.setSearch:
      return { ...state, search: action.payload.search || "" };
    case EAdminProductListActionKind.setSelectedProduct:
      return {
        ...state,
        selectedProduct: action.payload.selectedProduct || null,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export const AdminProductListContext = createContext<
  IAdminProductListContext | undefined
>(undefined);

export const AdminProductListProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AdminProductListContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminProductListContext.Provider>
  );
};

export const useAdminProductList = () => {
  const context = useContext(AdminProductListContext);
  if (!context) {
    throw new Error(
      "useAdminProductList must be used within AdminProductListProvider",
    );
  }
  return context;
};
