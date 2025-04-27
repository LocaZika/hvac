"use client";

import { TOrder } from "@/types/server";
import {
  EAdminOrderListActionKind,
  useAdminOrderList,
} from "@contexts/AdminOrderList.context";
import { useEffect } from "react";
import OrderSearch from "../search/OrderSearch";
import Pagination from "@components/pagination/Pagination";
import OrderList from "./orderList/OrderList";
import queryString from "query-string";

interface IOrderListParams {
  page: number;
  search?: string;
}

export default function OrderPage() {
  const { state, dispatch } = useAdminOrderList();
  const fetchData = async () => {
    const params: IOrderListParams = {
      page: 1,
    };
    if (state.search && state.search.length > 0) {
      params.search = state.search;
    }
    const resFromServer = await fetch(
      `/api/orders?${queryString.stringify(params)}`,
    );
    const res: IBackendResponse<TOrder[]> = await resFromServer.json();
    if (res.statusCode === 200) {
      dispatch({
        type: EAdminOrderListActionKind.setOrders,
        payload: { orders: res.data },
      });
      dispatch({
        type: EAdminOrderListActionKind.setPage,
        payload: { page: res.page },
      });
      dispatch({
        type: EAdminOrderListActionKind.setTotalPages,
        payload: { page: res.totalPages },
      });
    }
    return res;
  };
  const handlePageChange = (page: number): void => {
    dispatch({
      type: EAdminOrderListActionKind.setPage,
      payload: { page },
    });
  };
  useEffect(() => {
    fetchData();
  }, [state.page]);
  return (
    <div className="order-page">
      <div className="order-options grid grid-cols-12 items-center">
        <div className="order-options__search col-span-10 text-base lg:col-span-4">
          <OrderSearch />
        </div>
      </div>
      <div className="order-list mt-4">
        <OrderList data={state.orders} />
      </div>
      <div className="order-paginate float-right mt-4">
        <Pagination
          totalPages={state.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
