import prismadb from '@/lib/prismadb'
import React from 'react'
import MembersForm from './components/tasks-form'
import TasksForm from './components/tasks-form'

const TasksPage = async({
    params
} : {
    params : {taskId : string, projectId : string}
}) => {
    const task = await prismadb.task.findUnique({
        where : {
            id : params.taskId
        }
    })

    const projectMembers = await prismadb.projectMember.findMany({
        where : {
            projectId : params.projectId
        }
    })


  return (
   <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
        <TasksForm initialData={task} projectMembers={projectMembers} />
    </div>
   </div>
  )
}

export default TasksPage
