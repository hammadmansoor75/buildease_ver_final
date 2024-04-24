import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    {params} : {params : { projectMemberId : string}}
) {
    try {

        if(!params.projectMemberId){
            return new NextResponse("Project Member Id is required", {status : 400})
        }


        const projectMember = await prismadb.projectMember.findUnique({
            where : {
                id : params.projectMemberId,
            }
        })
        return NextResponse.json(projectMember)
    } catch (error) {
        console.log("[PROJECTMEMBERS_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH(
    req : Request,
    {params} : {params : {memberId : string, projectId : string}}
) {
    try {
        console.log("Inside Patch Members try block")
        const {userId} = auth();
        const body = await req.json()
        const {name,email,permission} = body;
        console.log(params.memberId)
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!name || !email || !permission){
            return new NextResponse("All fields are required", {status : 400})
        }
        // if(!params.memberId){
        //     return new NextResponse("Project Member Id is required", {status : 400})
        // }

        const projectByUserId = await prismadb.project.findFirst({
            where : {
                id : params.projectId,
                createdBy : userId
            }
        })

        if(!projectByUserId){
            return new NextResponse("UnAuthorized", {status : 403})
        }

        console.log(params.projectId, params.memberId)
        
        const projectMember = await prismadb.projectMember.update({
            where : {
                id : params.memberId
            },
            data : {
                name,
                email,
                permission,
                projectId : params.projectId
            }
        })
        return NextResponse.json(projectMember)
    } catch (error) {
        console.log("[PROJECTMEMBER_PATCH]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}


export async function DELETE(
    req : Request,
    {params} : {params : {projectId : string, projectMemberId : string}}
) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!params.projectId){
            return new NextResponse("Project Id is required", {status : 400})
        }

        if(!params.projectMemberId){
            return new NextResponse("Project Member Id is required", {status : 400})
        }

        const projectByUserId = await prismadb.project.findFirst({
            where : {
                id : params.projectId,
                createdBy : userId
            }
        })

        if(!projectByUserId){
            return new NextResponse("UnAuthorized", {status : 403})
        }

        const projectMember = await prismadb.projectMember.deleteMany({
            where : {
                id : params.projectMemberId,
            }
        })
        return NextResponse.json(projectMember)
    } catch (error) {
        console.log("[PROJECTMEMBERS_DELETE]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}