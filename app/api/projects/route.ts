import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req : Request
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
        const project = await prismadb.project.create({
            data : {
                name,
                description,
                location,
                startingDate,
                endingDate,
                createdBy : userId
            }
        })
        return NextResponse.json(project);
        
    } catch (error) {
        console.log("[PROJECTS_POST]",error)
        return new NextResponse("Internal Error", {status : 500});
    }
}