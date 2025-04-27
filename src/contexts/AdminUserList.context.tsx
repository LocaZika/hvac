"use client";

import { TUser } from "@/types/server";
import { createContext, useContext, useReducer } from "react";

export enum EAdminUserListActionKind {
  setUsers = "setUsers",
  setPage = "setPage",
  setTotalPages = "setTotalPages",
  setSearch = "setSearch",
}

interface IAdminUserListAction {
  type: EAdminUserListActionKind;
  payload: Partial<IAdminUserListState>;
}

interface IAdminUserListContext {
  state: IAdminUserListState;
  dispatch: React.Dispatch<IAdminUserListAction>;
}

interface IAdminUserListState {
  users: TUser[];
  page: number;
  totalPages: number;
  search: string;
}

export const AdminUserListContext = createContext<
  IAdminUserListContext | undefined
>(undefined);

const initialState: IAdminUserListState = {
  users: [],
  page: 1,
  totalPages: 1,
  search: "",
};

function reducer(state: IAdminUserListState, action: IAdminUserListAction) {
  switch (action.type) {
    case EAdminUserListActionKind.setUsers:
      return { ...state, users: action.payload.users || [] };
    case EAdminUserListActionKind.setPage:
      return { ...state, page: action.payload.page || 1 };
    case EAdminUserListActionKind.setTotalPages:
      return { ...state, totalPages: action.payload.totalPages || 1 };
    case EAdminUserListActionKind.setSearch:
      return { ...state, search: action.payload.search || "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const AdminUserListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminUserListContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminUserListContext.Provider>
  );
};

export const useAdminUserList = () => {
  const context = useContext(AdminUserListContext);
  if (!context) {
    throw new Error(
      "useAdminUserList must be used within an AdminUserListProvider",
    );
  }
  return context;
};
