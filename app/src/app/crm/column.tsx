"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      )
    }
  },
  {
    accessorKey: "address",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      )
    }
  },
  {
    id: "actions",
    header: "Action",
    cell: ({row}) => {
      const payment = row.original

      return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/*<DropdownMenuItem*/}
              {/*    onClick={() => navigator.clipboard.writeText(payment.id)}*/}
              {/*>*/}
              {/*  Copy payment ID*/}
              {/*</DropdownMenuItem>*/}
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                  className={"bg-gradient-to-r from-[#7a2180] to-[#e40276] text-white rounded-lg hover:opacity-50"}
                  onClick={(e: any) => {
                    e.preventDefault()
                    // prevent propagation
                    e.stopPropagation()

                    window.location.href = `/${payment.id}`
                  }}
              >
                AI Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                  className={"text-black rounded-lg hover:opacity-50"}
                  onClick={(e: any) => {
                    e.preventDefault()
                    // prevent propagation
                    e.stopPropagation()

                    window.location.href = `/crm/${payment.id}`
                  }}
              >
                Open Detail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      )
    },
  },
]
