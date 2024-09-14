"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { ArrowUpDown} from "lucide-react"
import { Button } from "@/components/ui/button"

export type CategoryColumn = {
  id: string
  name: string
  billboard: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
   {
      accessorKey: 'name',
      header: ({ column }) => {
         return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
               Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: 'billboardId',
      header: ({ column }) => {
         return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
               Billboard
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => row.original.billboard,
   },
   {
      accessorKey: 'createdAt',
      header: ({ column }) => {
         return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
               Date
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: 'Actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
