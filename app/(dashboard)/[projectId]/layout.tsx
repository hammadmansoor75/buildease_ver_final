import Navbar from "@/components/navbar"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DasboardLayout({
    children,
    params
} : {
    children : React.ReactNode,
    params : {projectId : string}
}) {
    const {userId} = auth()
    if(!userId) {
        redirect('/sign-in')
    }

    const project = await prismadb.project.findFirst({
        where : {
            id : params.projectId,
            createdBy : userId
        }
    })

    if(!project){
        redirect('/');
    }

    return (
        <>
            <div><Navbar/></div>
            {children}
        </>
    )
}