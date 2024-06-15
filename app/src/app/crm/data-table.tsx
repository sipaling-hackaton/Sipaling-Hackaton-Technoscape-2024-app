"use client";

import React, {useEffect} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel, Row,
} from "@tanstack/react-table";
import { useFormState, useFormStatus } from "react-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {mkConfig, generateCsv, download} from 'export-to-csv'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {importData} from "@/services/crm-action";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}


export function DataTable<TData, TValue>({
                                           columns,
                                           data = [],
                                         }: DataTableProps<TData, TValue>) {
  const gotoDetail = (email: string) => {
    window.location.href = `/crm/${email}`;
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, value) => {
      // @ts-ignore
      const nameMatch = row
          .getValue("name")
          .toLowerCase()
          .includes(value.toLowerCase());
      // @ts-ignore
      const emailMatch = row
          .getValue("email")
          .toLowerCase()
          .includes(value.toLowerCase());
      // @ts-ignore
      const id = row.getValue("id").toLowerCase().includes(value.toLowerCase());
      // @ts-ignore
      const phone = row
          .getValue("phone")
          .toLowerCase()
          .includes(value.toLowerCase());

      return nameMatch || emailMatch || id || phone;
    },
    state: {
      sorting,
      columnFilters,
    },
  });


  // function to import data
  const initialFormState = [
    {
    }
  ]

  // @ts-ignore
  const [state, formAction] = useFormState(importData, initialFormState);

  useEffect(() => {
    if (state.code === 400) {
      toast.error(state.message ?? "Error");
      return;
    }
    if (state.code === 200) {
      toast.success(state.message ?? "Success");
      return;
    }
  }, [state]);

  return (
      <div>
        <div className="flex items-center py-4 justify-between">
          <Input
              placeholder="Search data..."
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="max-w-sm"
          />


          <div
              className={"flex gap-4"}
          >


            <Dialog>
              <DialogTrigger
                  className={
                    "cursor-pointer hover:opacity-75 bg-black text-white px-4 py-2 rounded-md"
                  }
                  title={"zero time migration with data import"}
              >
                  Import
              </DialogTrigger>
              <DialogContent className={"flex flex-column gap-[20px]"}>
                <DialogHeader>
                  <DialogTitle>
                    Data Import
                  </DialogTitle>
                  <DialogDescription>
                    Please make sure the data have email and name column.
                    <form
                        className={"flex flex-column gap-4 my-5"}
                        action={formAction}
                    >
                      {/*<Select*/}
                      {/*required*/}
                      {/*>*/}
                      {/*  <SelectTrigger className="w-[180px]">*/}
                      {/*    <SelectValue placeholder="file type" />*/}
                      {/*  </SelectTrigger>*/}
                      {/*  <SelectContent>*/}
                      {/*    <SelectItem value="light">Light</SelectItem>*/}
                      {/*    <SelectItem value="dark">Dark</SelectItem>*/}
                      {/*    <SelectItem value="system">System</SelectItem>*/}
                      {/*  </SelectContent>*/}
                      {/*</Select>*/}
                      <Input
                          type={"file"}
                          placeholder={"file"}
                          name={"file"}
                          accept={".csv"}
                      />

                    {/*  alternative to button submit*/}
                      <Button
                          type={"submit"}
                      >
                        Submit
                      </Button>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/*<Button*/}
            {/*    // onClick={()=> exportExcel(table.getFilteredRowModel().rows)}*/}
            {/*    className={*/}
            {/*      "cursor-pointer hover:opacity-75"*/}
            {/*    }>*/}
            {/*  Download*/}
            {/*</Button>*/}

            <Link href={"crm/add"}>
              <Button
                  className={
                    "bg-gradient-to-r from-[#7a2180] to-[#e40276] cursor-pointer hover:opacity-75"
                  }>
                Add Customer
              </Button>
            </Link>
          </div>

        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                      key={headerGroup.id}>
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
                  table.getRowModel().rows.map((row: any) => (
                      <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          onClick={() => gotoDetail(row.original.id)}>
                        {row.getVisibleCells().map((cell: any) => (
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
                        className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  );
}


const csvConfig = mkConfig({
  fieldSeparator: ',',
  filename: 'sample', // export file name (without .csv)
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

// export function
// Note: change _ in Row<_>[] with your Typescript type.
const exportExcel = (rows: Row<any[]>[]) => {
  const rowData = rows.map((row) => row.original)
  // const csv = generateCsv(csvConfig)(rowData)
  // download(csvConfig)(csv)
}