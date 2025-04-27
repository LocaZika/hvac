'use client'
import { Pagination as RootPagination } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import paginationStyle from './pagination.module.scss';

interface IPagination {
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({totalPages, handlePageChange}: IPagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePage = (e: ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    handlePageChange(page);
  }
  useEffect(() => {
  }, [totalPages]);
  return (
    <RootPagination
      variant="outlined"
      page={currentPage}
      count={totalPages}
      shape="rounded"
      hideNextButton
      hidePrevButton
      onChange={handlePage}
      classes={{
        ul: paginationStyle['pagination-list'],
      }}
    />
  )
}
