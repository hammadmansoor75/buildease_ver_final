"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ResourcesColumn } from "./columns"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

interface CellActionProps {
    data : ResourcesColumn
}
export const CellAction : React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const onCopy = (id : string) => {
        navigator.clipboard.writeText(id);
        toast.success("Resource Id copied to the clipboard")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal  className="h-4 w-4"/>
                </Button> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.projectId}/resources/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}