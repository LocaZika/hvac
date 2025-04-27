"use client";
import { TCarItemDetail } from "@/types/server";
import DataTable from "@components/adminComponents/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import deleteAction from "@actions/adminArea/products/delete.action";
import { Id, toast } from "react-toastify";
import {
  EAdminProductListActionKind,
  useAdminProductList,
} from "@/contexts/AdminProductList.context";
import { TProductData } from "@components/adminComponents/dialog/ProductDialog";
import { useProductDialog } from "@contexts/ProductDialog.context";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProductListProps {
  data: TCarItemDetail[];
}

const columns: ColumnDef<TProductData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "transmission",
    header: "Transmission",
  },
  {
    accessorKey: "tradeType",
    header: "Trade Type",
  },
  {
    accessorKey: "type",
    header: "Car Type",
  },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
  },
  {
    accessorKey: "hp",
    header: "HP",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
  },
  {
    accessorKey: "vin",
    header: "VIN",
  },
  {
    accessorKey: "stock",
    header: "STOCK",
  },
];
export default function ProductList({ data }: IProductListProps) {
  const { dispatch } = useAdminProductList();
  const [state, setState] = useProductDialog();
  const handleEdit = async (row: TProductData) => {
    dispatch({
      type: EAdminProductListActionKind.setSelectedProduct,
      payload: {
        selectedProduct: row,
      },
    });
    setState({
      buttonContent: <FontAwesomeIcon icon={faFilePen} />,
      description: "Update a existed product",
      title: "Update The Product",
      open: true,
    });
  };
  const handleDelete = async (row: TProductData): Promise<Id> => {
    const formData = new FormData();
    formData.append("id", row.id ? row.id.toString() : "");
    const res = await deleteAction(formData);
    if (!res.ok || res.statusCode !== 200) {
      return toast.error(res.message ?? res.error);
    }
    return toast.success("Delete successful");
  };
  return (
    <DataTable
      data={data as unknown as TProductData[]}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
