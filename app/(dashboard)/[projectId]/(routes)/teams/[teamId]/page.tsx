import prismadb from '@/lib/prismadb'
import React from 'react'
import TeamsForm from './components/teams-form'

const TeamsPage = async({
    params
} : {
    params : {teamId : string , projectId : string}
}) => {
    const team = await prismadb.team.findUnique({
        where : {
            id : params.teamId
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

        <TeamsForm initialData={team} projectMembers = {projectMembers} />
    </div>
   </div>
  )
}

export default TeamsPage
