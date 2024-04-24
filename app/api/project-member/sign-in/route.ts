import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req : Request
){
    try {
        const body = await req.json();
        const {id,password} = body;

        if(!id || !password){
            return new NextResponse("All fields are required", {status : 400})
        }

        const projectMemberById = await prismadb.projectMember.findUnique({
            where : {
                id : id
            }
        })

        if(!projectMemberById){
            return new NextResponse("No user with this id", {status : 402})
        }

        if(projectMemberById.password === password){
            return NextResponse.json(projectMemberById);
        }else{
            return new NextResponse("Invalid Password", {status : 402})
        }
    } catch (error) {
        console.log("[PROJECTMEMBERS_SIGNINPOST]",error)
        return new NextResponse("Internal Error", {status : 500})
    }
}