"use client";

import { Container, Grid } from "@mui/material";
import CarFilterForm from "./carFilterForm/CarFilterForm";
import CarList from "./carList/CarList";
import CarSearchForm from "./carSearchForm/CarSearchForm";
import CarSortForm from "./carSortForm/CarSortForm";
import carsPageStyle from "./cars.module.scss";
import Pagination from "@components/pagination/Pagination";
import { useCallback, useEffect, useReducer, useState } from "react";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import {
  carsPageReducer,
  carPageInitialState,
  ECarsPageActionKind,
  ICarPageInitialState,
} from "./carsPage.reducer";
import { TCarFilterForm } from "@/types/server";

export default function CarsPage({
  filterForm,
}: {
  filterForm: TCarFilterForm;
}) {
  const [{ carList, queryParams, totalPages }, dispatch] = useReducer(
    carsPageReducer,
    carPageInitialState,
  );
  const [carListStatus, setCarListStatus] = useState<TCarListStatus>("pending");
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  const fetchData = async () => {
    const params = {
      ...queryParams,
      ...queryString.parse(searchParams.toString()),
    };
    const resFromServer = await fetch(
      `/api/cars?${queryString.stringify(params)}`,
    );
    if (resFromServer.status === 404) {
      dispatch({
        type: ECarsPageActionKind.updateCarList,
        payload: { carList: [] },
      });
      setCarListStatus("notFound");
    }
    if (!resFromServer.ok) {
      setCarListStatus("error");
      throw new Error("Failed to fetch data");
    }
    const res = await resFromServer.json();
    dispatch({
      type: ECarsPageActionKind.updateCarList,
      payload: { carList: res.data },
    });
    dispatch({
      type: ECarsPageActionKind.updateTotalPages,
      payload: { totalPages: res.totalPages },
    });
    setCarListStatus("loaded");
    console.log(">>searchParams: ", queryString.parse(searchParams.toString()));
    router.push(`?${queryString.stringify(params)}`, { scroll: true });
  };
  const handleSearch = (keyword: string) => {
    const queryStr = createQueryString("q", keyword);
    router.push(`?${queryStr}`);
  };
  const handleSortByChange = (sortBy: "ascending" | "descending") => {
    const queryStr = createQueryString("sortBy", sortBy);
    router.push(`?${queryStr}`, { scroll: false });
  };
  const handlePageChange = (page: number) => {
    const queryStr = createQueryString("page", page.toString());
    router.push(`?${queryStr}`);
  };
  const handleFilter = (filterOptions: IFilterQuery) => {
    const queryStr = queryString.stringify(filterOptions);
    dispatch({
      type: ECarsPageActionKind.updateFilterOptions,
      payload: { filterOptions },
    });
    router.push(`?${queryStr}`);
  };
  const handleClearFilter = () => {
    router.push("?");
  };
  useEffect(() => {
    fetchData();
  }, [searchParams]);
  return (
    <section className={`${carsPageStyle["container"]} spad`}>
      <Container>
        <Grid container width={"auto"} marginX={"-1.5rem"}>
          <Grid item xs={12} lg={3} paddingX={"1.5rem"}>
            <div className={carsPageStyle["sidebar"]}>
              <CarSearchForm handleSearch={handleSearch} />
              <CarFilterForm
                data={filterForm}
                handleFilter={handleFilter}
                handleClearFilterOptions={handleClearFilter}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={9} paddingX={"1.5rem"}>
            <div className={carsPageStyle["sort"]}>
              <CarSortForm handleSortByChange={handleSortByChange} />
            </div>
            <div className={carsPageStyle["cars"]}>
              <CarList data={carList} status={carListStatus} />
            </div>
            <div className={carsPageStyle["pagination"]}>
              <Pagination
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
