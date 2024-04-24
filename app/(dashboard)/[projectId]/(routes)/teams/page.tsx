import { Heading } from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import MembersClient from './components/client'
import axios from 'axios'
import prismadb from '@/lib/prismadb'
import { TeamColumn } from './components/columns'

const Teams = async({
  params
} : {
  params : {projectId : string}
}) => {
  const teams = await prismadb.team.findMany({
    where : {
      projectId : params.projectId
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedTeams = teams.map((item) => ({
    id : item.id,
    name : item.name,
    teamLeader : item.teamLeaderId,
  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
           <MembersClient data={teams} />
        </div>
    </div>
  )
}

export default Teams
