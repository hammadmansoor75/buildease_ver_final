"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TasksColumn = {
  id: string
  title: string
  desc : string
  budget : string
  endingDate : string
  projectMember : string
  status : string
}

export const columns: ColumnDef<TasksColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "budget",
    header: "Budget",
  },
  {
    accessorKey : "endingDate",
    header: "Ending Date"
  },
  {
    accessorKey : "projectMember",
    header : "Assigned To"
  },
  {
    accessorKey : "status",
    header : "Status"
  },
  {
    accessorKey: "Actions",
    cell : ({row}) => <CellAction data={row.original}/>
  },
]
