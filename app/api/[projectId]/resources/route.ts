import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    {params} : {params : {projectId : string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json()
        const {name,resourceType,status,assignedToTeam,assignedFrom,assignedTill} = body;
        console.log('Input',name,resourceType,status,assignedToTeam,assignedFrom,assignedTill)
        if(!userId){
            return new NextResponse("Unauthenticated", {status : 401})
        }
        if(!name || !resourceType || !status || !assignedToTeam || !assignedFrom  || !assignedTill){
            return new NextResponse("All fields are required", {status : 400})
        }
        if(!params.projectId){
            return new NextResponse("Project id is required", {status : 400})
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
        const resource = await prismadb.resource.create({
            data : {
                name,
                resourceType,
                status,
                assignedToTeam,
                assignedFrom,
                assignedTill,
                projectId : params.projectId
                
            }
        })
        return NextResponse.json(resource);
        
    } catch (error) {
        console.log("[RESOURCES_POST]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}


export async function GET(
    req : Request,
    {params} : {params : {projectId : string}}
) {
    try {
        if(!params.projectId){
            return new NextResponse("Project id is required", {status : 400})
        }
    
        const resources = await prismadb.resource.findMany({
           where : {
            projectId : params.projectId
           }
        })
        return NextResponse.json(resources);
        
    } catch (error) {
        console.log("[RESOURCES_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}