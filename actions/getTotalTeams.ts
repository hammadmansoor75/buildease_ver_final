import prismadb from "@/lib/prismadb"

export const getTotalTeams = async(projectId : string) => {
    const team = await prismadb.team.findMany({
        where : {
            projectId : projectId
        }
    })

    return team.length;
}