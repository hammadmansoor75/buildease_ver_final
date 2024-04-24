import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    {params} : {params : {projectId : string}}
) {
    try {
        console.log("Inside the post tasks function")
        const {userId} = auth();
        const body = await req.json()
        const {title,desc,teamId,startingDate,endingDate,budget,status,projectMember} = body;
        console.log()
        if(!userId){
            return new NextResponse("Unauthenticated", {status : 401})
        }
        if(!title || !desc || !status || !startingDate || !endingDate || !budget || !projectMember){
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
        const task = await prismadb.task.create({
            data : {
                title,
                desc,
                projectMember,
                startingDate,
                status,
                endingDate,
                budget,
                projectId : params.projectId
            }
        })
        return NextResponse.json(task);
        
    } catch (error) {
        console.log("[TASKS_POST]",error)
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
    
        const tasks = await prismadb.task.findMany({
           where : {
            projectId : params.projectId
           }
        })
        return NextResponse.json(tasks);
        
    } catch (error) {
        console.log("[TASKS_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}