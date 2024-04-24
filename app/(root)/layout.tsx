import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
} : {
    children : React.ReactNode
}) {
    const {userId} = auth();
    if(!userId) {
        redirect('/sign-in')
    }

    const project = await prismadb.project.findFirst({
        where : {
            createdBy : userId
        }
    })

    if(project){
        redirect(`${project.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}