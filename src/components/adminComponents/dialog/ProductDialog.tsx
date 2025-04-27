"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { toast } from "react-toastify";
import { ETransmission, ETradeType, EFuelType } from "@/enums/enum";
import { Separator } from "@components/ui/separator";
import { TCarItemDetail } from "@/types/server";
import { useState } from "react";
import {
  EAdminProductListActionKind,
  useAdminProductList,
} from "@contexts/AdminProductList.context";

export type TProductData = z.infer<typeof FormAddNewSchema>;

const FormAddNewSchema = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: "Name is require" }).min(8, {
    message: "Name must be at least 8 characters",
  }),
  brand: z.string({ required_error: "brand is require" }).min(5, {
    message: "Brand must be at least 5 characters",
  }),
  price: z.coerce.number({ required_error: "price is require" }).min(50, {
    message: "Price must be at least 50",
  }),
  transmission: z.nativeEnum(ETransmission, {
    required_error: "Transmission is require",
  }),
  tradeType: z.nativeEnum(ETradeType, {
    required_error: "Trade type is require",
  }),
  fuelType: z.nativeEnum(EFuelType, { required_error: "Fuel type is require" }),
  type: z.string({ required_error: "Type is require" }).min(3, {
    message: "Type must be at least 3 characters",
  }),
  hp: z.coerce.number({ required_error: "Horsepower is require" }).min(50, {
    message: "Horsepower must be at least 50",
  }),
  model: z.coerce.number({ required_error: "Model is require" }).min(2000, {
    message: "Model must be at least 2000",
  }),
  mileage: z.coerce.number({ required_error: "Mileage is require" }).min(0, {
    message: "Mileadge must be at least 0",
  }),
  vin: z.string({ required_error: "VIN is require" }).min(10, {
    message: "VIN must be at least 10 characters",
  }),
  stock: z.string({ required_error: "STOCK is require" }).min(10, {
    message: "STOCK must be at least 10 characters",
  }),
  imgs: z.array(z.string()).optional(),
  detailImgs: z.array(z.string()).optional(),
});

export default function ProductDialog({
  action,
  buttonTrigger,
  title,
  description,
  selectedProduct,
  buttonTriggerClassName,
}: {
  action: (formData: FormData) => Promise<IBackendResponse<TCarItemDetail>>;
  buttonTrigger: string | React.ReactNode;
  title: string;
  description?: string;
  selectedProduct?: TProductData;
  buttonTriggerClassName?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<{ imgs: string[]; detailImgs: string[] }>({
    imgs: [],
    detailImgs: [],
  });
  const { state, dispatch } = useAdminProductList();
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    {
      type,
      brand,
      name,
    }: { type: "imgs" | "detailImgs"; brand: string; name: string },
  ) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles) {
      const fileArray = selectedFiles.map(
        (file) => `${brand.toLowerCase()}/${name.toLowerCase()}/${file.name}`,
      );
      setFiles((prev) => ({ ...prev, [type]: fileArray }));
    }
  };
  const defSelectedProduct = { ...selectedProduct };
  delete defSelectedProduct.imgs;
  delete defSelectedProduct.detailImgs;
  const form = useForm<TProductData>({
    resolver: zodResolver(FormAddNewSchema),
    defaultValues: defSelectedProduct ?? {
      brand: "",
      name: "",
      mileage: 10,
      vin: "",
      stock: "",
      model: 2000,
      price: 100,
      type: "",
      hp: 100,
    },
  });
  const handleSubmit = async (data: TProductData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", data.price.toString());
    formData.append("transmission", data.transmission);
    formData.append("tradeType", data.tradeType);
    formData.append("fuelType", data.fuelType);
    formData.append("type", data.type);
    formData.append("hp", data.hp.toString());
    formData.append("model", data.model.toString());
    formData.append("mileage", data.mileage.toString());
    formData.append("vin", data.vin);
    formData.append("stock", data.stock);
    formData.append("imgs", JSON.stringify(files.imgs));
    formData.append("detailImgs", JSON.stringify(files.detailImgs));
    const res = await action(formData);
    if (!res.ok) {
      toast.error(res.message ?? res.error);
      return;
    }
    dispatch({
      type: EAdminProductListActionKind.setProducts,
      payload: { products: [...state.products, res.data as TCarItemDetail] },
    });
    toast.dismiss();
    form.reset();
    toast.success("Product added successfully");
    return;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className={`ml-2 h-full ${buttonTriggerClassName}`}
        >
          {buttonTrigger}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description ?? ""}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-12">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-12 m-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert product name here..."
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert product brand here..."
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Transmission</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please choose a transmission type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ETransmission.auto}>Auto</SelectItem>
                        <SelectItem value={ETransmission.manual}>
                          Manual
                        </SelectItem>
                        <SelectItem value={ETransmission.mixed}>
                          Mixed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tradeType"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Trade type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please choose a trade type type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ETradeType.sale}>Sale</SelectItem>
                        <SelectItem value={ETradeType.rent}>Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Fuel type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please choose a fuel type type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EFuelType.gasoline}>
                          Gasoline
                        </SelectItem>
                        <SelectItem value={EFuelType.diesel}>Diesel</SelectItem>
                        <SelectItem value={EFuelType.electric}>
                          Electric
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert product type here..."
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hp"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>HP</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={2000}
                        max={new Date().getFullYear()}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Mileage</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={10}
                        max={5000}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>VIN</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert product vin here..."
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>STOCK</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert product stock here..."
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgs"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleFileChange(e, {
                            type: "imgs",
                            brand: form.getValues("brand"),
                            name: form.getValues("name"),
                          })
                        }
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detailImgs"
                render={({ field }) => (
                  <FormItem className="col-span-6 m-2">
                    <FormLabel>Detail Images</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleFileChange(e, {
                            type: "detailImgs",
                            brand: form.getValues("brand"),
                            name: form.getValues("name"),
                          })
                        }
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-4" />
            <DialogFooter>
              <Button
                type="submit"
                variant="default"
                className="bg-green-500 p-2 text-white hover:shadow-lg"
              >
                Save Changes
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="default"
                  className="bg-sky-500 p-2 text-white hover:shadow-lg"
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
