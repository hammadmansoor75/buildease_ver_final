import { Heading } from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import MembersClient from './components/client'
import axios from 'axios'
import prismadb from '@/lib/prismadb'

const ProjectMembers = async({
  params
} : {
  params : {projectId : string}
}) => {
  const projectMembers = await prismadb.projectMember.findMany({
    where : {
      projectId : params.projectId
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedProjectMembers = projectMembers.map((item) => ({
    id : item.id,
    name : item.name,
    email : item.email,
    permission : item.permission,
    password : item.password
  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
           <MembersClient data={projectMembers} />
        </div>
    </div>
  )
}

export default ProjectMembers
