"use client";

import searchAction from "@actions/adminArea/users/search.action";
import {
  useAdminUserList,
  EAdminUserListActionKind,
} from "@contexts/AdminUserList.context";
import Search from "./Search";
import { FormEvent } from "react";
import { Id, toast } from "react-toastify";

export default function UserSearch() {
  const { dispatch } = useAdminUserList();
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
      type: EAdminUserListActionKind.setSearch,
      payload: {
        search: keywords,
      },
    });
    dispatch({
      type: EAdminUserListActionKind.setUsers,
      payload: {
        users: res.data,
      },
    });
    dispatch({
      type: EAdminUserListActionKind.setPage,
      payload: {
        page: res.page,
      },
    });
    dispatch({
      type: EAdminUserListActionKind.setTotalPages,
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
      placeholder="Search the customer's email..."
      handleSubmit={handleSubmit}
    />
  );
}
