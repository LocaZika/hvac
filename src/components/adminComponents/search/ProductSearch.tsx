"use client";
import { FormEvent } from "react";
import Search from "./Search";
import searchAction from "@actions/adminArea/products/search.action";
import { Id, toast } from "react-toastify";
import {
  EAdminProductListActionKind,
  useAdminProductList,
} from "@/contexts/AdminProductList.context";

export default function ProductSearch() {
  const { dispatch } = useAdminProductList();
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
      type: EAdminProductListActionKind.setSearch,
      payload: {
        search: keywords,
      },
    });
    dispatch({
      type: EAdminProductListActionKind.setProducts,
      payload: {
        products: res.data,
      },
    });
    dispatch({
      type: EAdminProductListActionKind.setPage,
      payload: {
        page: res.page,
      },
    });
    dispatch({
      type: EAdminProductListActionKind.setTotalPages,
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
      placeholder="Search the product name..."
      handleSubmit={handleSubmit}
    />
  );
}
