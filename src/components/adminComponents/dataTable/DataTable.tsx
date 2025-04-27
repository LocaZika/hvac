"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProductDialog, { TProductData } from "../dialog/ProductDialog";
import { updateAction } from "@actions/adminArea/products/update.action";

interface DataTableProps<TData, TColumnValue> {
  columns: ColumnDef<TData, TColumnValue>[];
  data: TData[];
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
}

export default function DataTable<TData, TColumnValue>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<TData, TColumnValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="capitalize">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {onEdit && onDelete ? (
                  <TableCell className="btn-options mr-2 flex justify-end gap-2">
                    <ProductDialog
                      action={updateAction}
                      buttonTrigger={<FontAwesomeIcon icon={faFilePen} />}
                      title="Update Product"
                      description="Update a existed product"
                      selectedProduct={row.original as TProductData}
                      buttonTriggerClassName="px-2 py-1 text-green-600"
                    />
                    <Button
                      variant={"outline"}
                      className="px-2 py-1 text-red-600"
                      onClick={
                        onDelete ? () => onDelete(row.original) : undefined
                      }
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
