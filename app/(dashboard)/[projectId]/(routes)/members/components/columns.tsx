"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectMemberColumn = {
  id: string
  name: string
  email : string
  permission : string
  password : string
}

export const columns: ColumnDef<ProjectMemberColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "permission",
    header: "Permission",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "Actions",
    cell : ({row}) => <CellAction data={row.original}/>
  },
]
