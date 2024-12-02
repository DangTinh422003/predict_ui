"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/utils/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export type Payment = {
  "Customer ID": string;
  Age: number;
  "Item Purchased": string;
  Gender: "Male" | "Female";
  "Purchase Amount (USD)": string;
  Location: string;
  Size: string;
  Category: string;
  Color: string;
  Season: string;
  "Review Rating": number;
  "Subscription Status": string;
  "Shipping Type": string;
  "Discount Applied": string;
  "Promo Code Used": string;
  "Previous Purchases": string;
  "Payment Method": string;
  "Frequency of Purchases": string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "Customer ID",
    header: "Customer ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Customer ID")}</div>
    ),
  },
  {
    accessorKey: "Age",
    header: "Age",
    cell: ({ row }) => <div className="capitalize">{row.getValue("Age")}</div>,
  },
  {
    accessorKey: "Item Purchased",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Purchased
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("Item Purchased")}</div>,
  },
  {
    accessorKey: "Gender",
    header: () => <div className="text-right">Gender</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("Gender")}</div>
      );
    },
  },
  {
    accessorKey: "Purchase Amount (USD)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purchase Amount (USD)
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Purchase Amount (USD)")}
        </div>
      );
    },
  },
  {
    accessorKey: "Location",
    header: () => <div className="text-right">Location</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Location")}
        </div>
      );
    },
  },
  {
    accessorKey: "Size",
    header: () => <div className="text-right">Size</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("Size")}</div>
      );
    },
  },
  {
    accessorKey: "Category",
    header: () => <div className="text-right">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Category")}
        </div>
      );
    },
  },
  {
    accessorKey: "Color",
    header: () => <div className="text-right">Color</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("Color")}</div>
      );
    },
  },
  {
    accessorKey: "Season",
    header: () => <div className="text-right">Season</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("Season")}</div>
      );
    },
  },
  {
    accessorKey: "Review Rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Review Rating
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Review Rating")}
        </div>
      );
    },
  },
  {
    accessorKey: "Subscription Status",
    header: () => <div className="text-right">Subscription Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Subscription Status")}
        </div>
      );
    },
  },
  {
    accessorKey: "Shipping Type",
    header: () => <div className="text-right">Shipping Type</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Shipping Type")}
        </div>
      );
    },
  },
  {
    accessorKey: "Promo Code Used",
    header: () => <div className="text-right">Promo Code Used</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Promo Code Used")}
        </div>
      );
    },
  },
  {
    accessorKey: "Previous Purchases",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Previous Purchases
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Previous Purchases")}
        </div>
      );
    },
  },
  {
    accessorKey: "Payment Method",
    header: () => <div className="text-right">Payment Method</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Payment Method")}
        </div>
      );
    },
  },
  {
    accessorKey: "Frequency of Purchases",
    header: () => <div className="text-right">Frequency of Purchases</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Frequency of Purchases")}
        </div>
      );
    },
  },
  {
    accessorKey: "Discount Applied",
    header: () => <div className="text-right">Discount Applied</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("Discount Applied")}
        </div>
      );
    },
  },
];

type SelectBoxData = {
  gender: ["Male", "Female"];
  purchaseAmount: number[];
  state: string[];
  subscriptionStatus: string[];
  frequencyOfPurchases: string[];

  category: string[];
  color: string[];
  season: string[];
};

const INIT_VAL: SelectBoxData = {
  gender: ["Male", "Female"],
  purchaseAmount: [],
  state: [],
  subscriptionStatus: [],
  frequencyOfPurchases: [],
  category: [],
  color: [],
  season: [],
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [data, setData] = React.useState<Payment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [onPredicting, setOnPredicting] = React.useState(false);
  const [comboBoxFilters, setComboBoxFilters] =
    React.useState<SelectBoxData>(INIT_VAL);
  const [predictType, setPredictType] = React.useState<
    "Fashion trends" | "Customer segmentation" | null
  >("Customer segmentation");

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await supabase.from("Customer").select("*");
      const data = res.data as Payment[];

      const setPurchaseAmount = new Set<number>();
      const setLocation = new Set<string>();
      const setSubscriptionStatus = new Set<string>();
      const setFrequencyOfPurchases = new Set<string>();
      const setCategory = new Set<string>();
      const setColor = new Set<string>();
      const setSeason = new Set<string>();

      data.forEach((item) => {
        setPurchaseAmount.add(Number(item["Purchase Amount (USD)"]));
        setLocation.add(item.Location);
        setSubscriptionStatus.add(item["Subscription Status"]);
        setFrequencyOfPurchases.add(item["Frequency of Purchases"]);
        setCategory.add(item.Category);
        setColor.add(item.Color);
        setSeason.add(item.Season);
      });

      setComboBoxFilters({
        gender: ["Male", "Female"],
        purchaseAmount: Array.from(setPurchaseAmount),
        state: Array.from(setLocation),
        subscriptionStatus: Array.from(setSubscriptionStatus),
        frequencyOfPurchases: Array.from(setFrequencyOfPurchases),
        category: Array.from(setCategory),
        color: Array.from(setColor),
        season: Array.from(setSeason),
      });

      setData(data);
      setIsLoading(false);
    })();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const FormSchema = z.object({
    age: z.number({
      required_error: "Required",
    }),
    gender: z.string({
      required_error: "Required",
    }),
    category: z.string({
      required_error: "Required",
    }),
    state: z.string({
      required_error: "Required",
    }),
    season: z.string({
      required_error: "Required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: 18,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setOnPredicting(true);

    const res = await fetch("http://localhost:3000/predict-trend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes: {
      predicted_item: string;
      percentage: number;
    } = await res.json();

    toast.success("Predicted item: " + dataRes.predicted_item);

    setOnPredicting(false);
  }

  return !isLoading ? (
    <div>
      <div className="my-10 max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Age"
                        {...field}
                        type="number"
                        value={field.value.toString() || ""}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {comboBoxFilters.gender.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {comboBoxFilters.category.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>state</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {comboBoxFilters.state.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>season</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {comboBoxFilters.season.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant={onPredicting ? "loading" : "default"}
                className="font-semibold mt-4"
              >
                Predict <Zap />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="w-full ">
        <div>
          <ToastContainer />
          <div className="flex items-center py-4 justify-between">
            <Input
              placeholder="Filter Customer IDs..."
              value={
                (table.getColumn("Customer ID")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("Customer ID")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex gap-6">
              <div className="flex gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Please enter full parameters
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                                header.getContext()
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
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader className="animate-spin" size={30} />
    </div>
  );
}
