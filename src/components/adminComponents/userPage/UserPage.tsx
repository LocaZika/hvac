"use client";

import { TUser } from "@/types/server";
import {
  EAdminUserListActionKind,
  useAdminUserList,
} from "@contexts/AdminUserList.context";
import queryString from "query-string";
import UserSearch from "../search/UserSearch";
import Pagination from "@components/pagination/Pagination";
import UserList from "./userList/UserList";
import { useEffect } from "react";

interface IUserListParams {
  page: number;
  search?: string;
}

export default function UserPage() {
  const { state, dispatch } = useAdminUserList();
  const fetchData = async () => {
    const params: IUserListParams = {
      page: 1,
    };
    if (state.search && state.search.length > 0) {
      params.search = state.search;
    }
    const resFromServer = await fetch(
      `/api/users?${queryString.stringify(params)}`,
    );
    const res: IBackendResponse<TUser[]> = await resFromServer.json();
    if (res.statusCode === 200) {
      dispatch({
        type: EAdminUserListActionKind.setUsers,
        payload: { users: res.data },
      });
      dispatch({
        type: EAdminUserListActionKind.setPage,
        payload: { page: res.page },
      });
      dispatch({
        type: EAdminUserListActionKind.setTotalPages,
        payload: { page: res.totalPages },
      });
    }
    return res;
  };
  const handlePageChange = (page: number): void => {
    dispatch({
      type: EAdminUserListActionKind.setPage,
      payload: { page },
    });
  };
  useEffect(() => {
    fetchData();
  }, [state.page]);
  return (
    <div className="user-page">
      <div className="user-options grid grid-cols-12 items-center">
        <div className="user-options__search col-span-10 text-base lg:col-span-4">
          <UserSearch />
        </div>
      </div>
      <div className="user-list mt-4">
        <UserList data={state.users} />
      </div>
      <div className="user-paginate float-right mt-4">
        <Pagination
          totalPages={state.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
