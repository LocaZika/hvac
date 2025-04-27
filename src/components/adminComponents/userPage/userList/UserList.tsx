"use client";

import { TUser } from "@/types/server";
import DataTable from "@components/adminComponents/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/date.utils";

const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "create_at",
    header: "Created At",
    cell: ({ getValue }) =>
      formatDate(getValue() as string, "dd/MM/yyyy HH:mm"),
  },
];

export default function UserList({ data }: { data: TUser[] }) {
  return <DataTable data={data} columns={columns} />;
}
