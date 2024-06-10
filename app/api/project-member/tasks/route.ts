import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function PATCH(
    req : Request,
) {
    try {
        const body = await req.json();
        const {id,status} = body;

        const task = await prismadb.task.update({
            where : {
                id : id
            },
            data : {
                status : status
            }
        })

        return NextResponse.json(task);


    } catch (error) {
        console.log("[TASK_PATCH_PROJECTMEMBER]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}