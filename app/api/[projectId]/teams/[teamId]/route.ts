import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    {params} : {params : { teamId : string}}
) {
    try {

        if(!params.teamId){
            return new NextResponse("Project Member Id is required", {status : 400})
        }


        const team = await prismadb.team.findUnique({
            where : {
                id : params.teamId,
            }
        })
        return NextResponse.json(team)
    } catch (error) {
        console.log("[TEAM_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH(
    req : Request,
    {params} : {params : {teamId : string, projectId : string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json()
        const {name,teamLeader} = body;
        console.log(params.teamId)
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!name || !teamLeader){
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

        console.log(params.projectId, params.teamId)
        
        const team = await prismadb.team.update({
            where : {
                id : params.teamId
            },
            data : {
                name,
                teamLeaderId : teamLeader,
                projectId : params.projectId
            }
        })
        return NextResponse.json(team)
    } catch (error) {
        console.log("[PROJECTMEMBER_PATCH]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}


export async function DELETE(
    req : Request,
    {params} : {params : {projectId : string, teamId : string}}
) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!params.projectId){
            return new NextResponse("Project Id is required", {status : 400})
        }

        if(!params.teamId){
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

        const team = await prismadb.team.deleteMany({
            where : {
                id : params.teamId,
            }
        })
        return NextResponse.json(team)
    } catch (error) {
        console.log("[TEAM_DELETE]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}