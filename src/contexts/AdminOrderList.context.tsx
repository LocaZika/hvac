"use client";
import { TOrder } from "@/types/server";
import { createContext, useContext, useReducer } from "react";

export enum EAdminOrderListActionKind {
  setOrders = "setOrder",
  setPage = "setPage",
  setTotalPages = "setTotalPage",
  setSearch = "setSearch",
}

export interface IAdminOrderListAction {
  type: EAdminOrderListActionKind;
  payload: Partial<IAdminOrderListState>;
}

type TAdminOrderListContext = {
  state: IAdminOrderListState;
  dispatch: React.Dispatch<IAdminOrderListAction>;
};

interface IAdminOrderListState {
  orders: TOrder[];
  page: number;
  totalPages: number;
  search: string;
}

const adminOrderListState: IAdminOrderListState = {
  orders: [],
  page: 1,
  totalPages: 1,
  search: "",
};

export const AdminOrderListContext = createContext<
  TAdminOrderListContext | undefined
>(undefined);

function reducer(
  state: IAdminOrderListState,
  action: IAdminOrderListAction,
): IAdminOrderListState {
  switch (action.type) {
    case EAdminOrderListActionKind.setOrders:
      return { ...state, orders: action.payload.orders || [] };
    case EAdminOrderListActionKind.setPage:
      return { ...state, page: action.payload.page || 1 };
    case EAdminOrderListActionKind.setTotalPages:
      return { ...state, totalPages: action.payload.totalPages || 1 };
    case EAdminOrderListActionKind.setSearch:
      return { ...state, search: action.payload.search || "" };
    default:
      throw new Error("Invalid action!");
  }
}

export function AdminOrderListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer<
    (
      state: IAdminOrderListState,
      action: IAdminOrderListAction,
    ) => IAdminOrderListState
  >(reducer, adminOrderListState);
  return (
    <AdminOrderListContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminOrderListContext.Provider>
  );
}

export function useAdminOrderList() {
  const context = useContext<TAdminOrderListContext | undefined>(
    AdminOrderListContext,
  );
  if (!context) {
    throw new Error("useAdminOrderList must be within AdminOrderListProvider!");
  }
  return context;
}
