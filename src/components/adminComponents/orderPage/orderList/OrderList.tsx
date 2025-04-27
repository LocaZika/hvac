"use client";

import { TOrder } from "@/types/server";
import DataTable from "@components/adminComponents/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/date.utils";

const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "product_name",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "paid",
    header: "Paid",
  },
  {
    accessorKey: "sale_off",
    header: "Sale Off",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ getValue }) =>
      formatDate(getValue() as string, "dd/MM/yyyy HH:mm"),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ getValue }) =>
      formatDate(getValue() as string, "dd/MM/yyyy HH:mm"),
  },
];

export default function OrderList({ data }: { data: TOrder[] }) {
  return <DataTable data={data} columns={columns} />;
}
