"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TeamColumn = {
  id: string
  name: string
  teamLeaderId : string
}

export const columns: ColumnDef<TeamColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "Team Id",
  },
  {
    accessorKey: "teamLeaderId",
    header: "Team Leader",
  },
  {
    accessorKey: "Actions",
    cell : ({row}) => <CellAction data={row.original}/>
  },
]
