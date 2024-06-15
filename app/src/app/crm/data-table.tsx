"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
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

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter data..."
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm border-solid border-[#a9117b] border-2"
        />

        <Link href={"crm/add"}>
          <Button
            className={
              "bg-gradient-to-r from-[#7a2180] to-[#e40276] cursor-pointer hover:opacity-75"
            }>
            Add Customer
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table className=" border-solid border-[#a9117b] border-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-solid border-[#a9117b] border-2"
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
                  className="border-solid border-[#a9117b] border-2"
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
