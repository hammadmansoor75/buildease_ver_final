import { Heading } from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import MembersClient from './components/client'
import axios from 'axios'
import prismadb from '@/lib/prismadb'
import TasksClient from './components/client'

const ProjectMemberTasks = async({
  params
} : {
  params : {projectMemberId : string}
}) => {
  const tasks = await prismadb.task.findMany({
    where : {
      projectMember : params.projectMemberId
    },
    orderBy : {
      createdAt : "desc"
    }
  })


  const formattedTasks = tasks.map((item) => ({
    id : item.id,
    title : item.title,
    desc : item.desc,
    budget : item.budget,
    endingDate : item.endingDate
  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
           <TasksClient data={tasks} />
        </div>
    </div>
  )
}

export default ProjectMemberTasks
