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
        const {name,teamLeaderId} = body;
        if(!userId){
            return new NextResponse("Unauthenticated", {status : 401})
        }
        if(!name || !teamLeaderId){
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
        const team = await prismadb.team.create({
            data : {
                projectId : params.projectId,
                name,
                teamLeaderId : teamLeaderId,
            }
        })
        return NextResponse.json(team);
        
    } catch (error) {
        console.log("[TEAMS_POST]",error)
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
    
        const teams = await prismadb.team.findMany({
           where : {
            projectId : params.projectId
           }
        })
        return NextResponse.json(teams);
        
    } catch (error) {
        console.log("[TEAMS_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}