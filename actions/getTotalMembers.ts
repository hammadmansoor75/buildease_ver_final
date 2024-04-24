import prismadb from "@/lib/prismadb"

export const getTotalMembers = async(projectId : string) => {
    const members = await prismadb.projectMember.findMany({
        where : {
            projectId : projectId
        }
    })

    return members.length;
}