import Navbar from "@/components/navbar"
import ProjectMemberNavbar from "@/components/projectMember-nav"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DasboardLayout({
    children,
    params
} : {
    children : React.ReactNode,
    params : {projectMemberId : string}
}) {
    
    const projectMember = await prismadb.projectMember.findUnique({
        where : {
            id : params.projectMemberId
        }
    })

    if(!projectMember){
        redirect('/project-member/sign-in')
    }

    return (
        <>
            <div><ProjectMemberNavbar/></div>
            {children}
        </>
    )
}