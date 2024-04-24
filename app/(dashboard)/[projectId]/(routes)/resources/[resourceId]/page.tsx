import prismadb from '@/lib/prismadb'
import React from 'react'
import ResourcesForm from './components/resources-form'

const ResourcesPage = async({
    params
} : {
    params : {resourceId : string, projectId : string}
}) => {
    const resource = await prismadb.resource.findUnique({
        where : {
            id : params.resourceId
        }
    })

    console.log(params.projectId)

    const teams = await prismadb.team.findMany({
        where : {
            projectId : params.projectId
        }
    })

  return (
   <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
        <ResourcesForm initialData={resource} teams={teams}/>
    </div>
   </div>
  )
}

export default ResourcesPage
