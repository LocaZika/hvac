"use client";
import queryString from "query-string";
import ProductList from "./productList/ProductList";
import ProductSearch from "../search/ProductSearch";
import {
  EAdminProductListActionKind,
  useAdminProductList,
} from "@/contexts/AdminProductList.context";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductDialog from "../dialog/ProductDialog";
import addAction from "@actions/adminArea/products/add.action";
import Pagination from "@components/pagination/Pagination";

interface IProductPageParams {
  page: number;
  search?: string;
  sortBy: "asc" | "desc";
}

export default function ProductPage() {
  const { state, dispatch } = useAdminProductList();
  const fetchData = async () => {
    const params: IProductPageParams = {
      page: state.page,
      sortBy: "asc",
    };
    if (state.search && state.search.length > 0) {
      params.search = state.search;
    }
    const resFromServer = await fetch(
      `/api/cars?${queryString.stringify(params)}`,
    );
    const res = await resFromServer.json();
    if (res.statusCode === 200) {
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
          totalPages: res.totalPages,
        },
      });
    }
    return res;
  };
  const handlePageChange = (page: number): void => {
    dispatch({
      type: EAdminProductListActionKind.setPage,
      payload: { page },
    });
    return;
  };
  useEffect(() => {
    fetchData();
  }, [state.page, state.search]);
  return (
    <div className="products-page">
      <div className="product-options grid grid-cols-12 items-center">
        <div className="product-options__search col-span-10 text-base lg:col-span-4">
          <ProductSearch />
        </div>
        <div className="product-options__add col-span-2 h-full lg:col-span-8">
          <ProductDialog
            action={addAction}
            buttonTrigger={<FontAwesomeIcon icon={faPlus} />}
            title="Add Product"
            description="Add a new product"
          />
        </div>
      </div>
      <div className="product-list mt-4">
        <ProductList data={state.products} />
      </div>
      <div className="product-paginate float-right mt-4">
        <Pagination
          totalPages={state.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
