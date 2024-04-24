"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TasksColumn } from "./columns"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

interface CellActionProps {
    data : TasksColumn
}
export const CellAction : React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const onCopy = (id : string) => {
        navigator.clipboard.writeText(id);
        toast.success("Task Id copied to the clipboard")
    }

    const handleChangeStatus = async () => {
        const id = data.id
        const status = "Completed"
        const response = await axios.patch('/api/project-member/tasks',{
            id,
            status
        })
        router.refresh();
        console.log("Status Updated!",response)
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
                <DropdownMenuItem onClick={() => handleChangeStatus()}>
                    <Edit className="mr-2 h-4 w-4" />
                    Change Status
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}