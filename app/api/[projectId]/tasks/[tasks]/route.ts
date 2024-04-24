import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    {params} : {params : { taskId : string}}
) {
    try {

        if(!params.taskId){
            return new NextResponse("Task Id is required", {status : 400})
        }


        const task = await prismadb.task.findUnique({
            where : {
                id : params.taskId,
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log("[TASK_GET]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH(
    req : Request,
    {params} : {params : {taskId : string, projectId : string}}
) {
    try {
        console.log("Inside Patch Members try block")
        const {userId} = auth();
        const body = await req.json()
        const {title,desc,teamId,startingDate,endingDate,budget} = body;
        console.log(params.taskId)
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!title || !desc || !teamId || !startingDate || !endingDate || !budget){
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

        console.log(params.projectId, params.taskId)
        
        const task = await prismadb.task.update({
            where : {
                id : params.taskId
            },
            data : {
                title,
                desc,
                teamId,
                startingDate,
                endingDate,
                budget,
                projectId : params.projectId
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log("[TASK_PATCH]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}


export async function DELETE(
    req : Request,
    {params} : {params : {projectId : string, taskId : string}}
) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401})
        }
        if(!params.projectId){
            return new NextResponse("Project Id is required", {status : 400})
        }

        if(!params.taskId){
            return new NextResponse("Task Id is required", {status : 400})
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

        const task = await prismadb.task.deleteMany({
            where : {
                id : params.taskId,
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log("[Task_DELETE]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}