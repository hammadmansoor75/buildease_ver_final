import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    {params} : {params : {projectId : string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json()
        const {name,description,location,startingDate,endingDate} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!name || !description || !location || !startingDate || !endingDate){
            return new NextResponse("All fields are required", {status : 400})
        }
        if(!params){
            return new NextResponse("Project Id is required", {status : 400})
        }

        const project = await prismadb.project.updateMany({
            where : {
                id : params.projectId,
                createdBy : userId
            },
            data : {
                name,description,location,startingDate,endingDate
            }
        })
        return NextResponse.json(project)
    } catch (error) {
        console.log("[PROJECTS_PATCH]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}


export async function DELETE(
    req : Request,
    {params} : {params : {projectId : string}}
) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!params){
            return new NextResponse("Project Id is required", {status : 400})
        }

        const project = await prismadb.project.deleteMany({
            where : {
                id : params.projectId,
                createdBy : userId
            }
        })
        return NextResponse.json(project)
    } catch (error) {
        console.log("[PROJECTS_DELETE]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}