"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ResourcesColumn = {
  id: string
  name: string
  status : string
  assignedToTeam : string | null,
  assignedFrom : Date | null
  assignedTill : Date | null
}

export const columns: ColumnDef<ResourcesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assignedToTeam",
    header: "Assigned To",
  },
  {
    accessorKey: "assignedFrom",
    header: "From",
  },
  {
    accessorKey: "assignedTill",
    header: "Till",
  },
  {
    accessorKey: "Actions",
    cell : ({row}) => <CellAction data={row.original}/>
  },
]
