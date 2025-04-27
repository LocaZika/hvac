"use client";

import { searchAction } from "@actions/adminArea/orders/search.action";
import {
  EAdminOrderListActionKind,
  useAdminOrderList,
} from "@contexts/AdminOrderList.context";
import { FormEvent } from "react";
import { Id, toast } from "react-toastify";
import Search from "./Search";

export default function OrderSearch() {
  const { dispatch } = useAdminOrderList();
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<Id | undefined> => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const keywords = formData.get("search")?.toString() ?? "";
    const res = await searchAction(formData);
    if (!res.ok || res.statusCode !== 200) {
      return toast.error(res.message ?? res.error);
    }
    dispatch({
      type: EAdminOrderListActionKind.setSearch,
      payload: {
        search: keywords,
      },
    });
    dispatch({
      type: EAdminOrderListActionKind.setOrders,
      payload: {
        orders: res.data,
      },
    });
    dispatch({
      type: EAdminOrderListActionKind.setPage,
      payload: {
        page: res.page,
      },
    });
    dispatch({
      type: EAdminOrderListActionKind.setTotalPages,
      payload: {
        page: res.totalPages,
      },
    });
    toast.dismiss();
    if (keywords.trim() === "") {
      return toast.warn("Do not have keywords to search!");
    }
    return toast.success("Search successful");
  };
  return (
    <Search
      placeholder="Search the customer's email or status..."
      handleSubmit={handleSubmit}
    />
  );
}
