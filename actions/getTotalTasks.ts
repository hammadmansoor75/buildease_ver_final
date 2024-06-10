import prismadb from "@/lib/prismadb"

export const getTotalTasks = async(projectId : string) => {
    const task = await prismadb.task.findMany({
        where : {
            projectId : projectId
        }
    })

    return task.length
}