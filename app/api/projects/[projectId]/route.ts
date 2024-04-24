import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = auth();
   
    const body = await req.json()
    const {name,description,location,startingDate,endingDate} = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if(!name || !description || !location || !startingDate || !endingDate){
        return new NextResponse("All fields are required", {status : 400})
    }

    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    const store = await prismadb.project.updateMany({
      where: {
        id: params.projectId,
        createdBy : userId,
      },
      data: {
        name,
        description,
        location,
        startingDate,
        endingDate,
        createdBy : userId
      }
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[POJECT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.projectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const project = await prismadb.project.deleteMany({
      where: {
        id: params.projectId,
        createdBy : userId
      }
    });
  
    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};