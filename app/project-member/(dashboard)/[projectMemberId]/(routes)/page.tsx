import { Heading } from '@/components/ui/heading'
import prismadb from '@/lib/prismadb'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import {User} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ProjectMemberDashboardPageProps{
    params : {projectMemberId : string}
}

const ProjectMemberDashboard:React.FC<ProjectMemberDashboardPageProps> = async({
    params
}) => {
    const projectMember = await prismadb.projectMember.findUnique({
        where : {
            id : params.projectMemberId
        }
    })

    const project = await prismadb.project.findUnique({
        where : {
            id : projectMember?.projectId
        }
    })
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            
            
            <div className=''>
                <div className='flex items-center justify-between'>
                    <Heading title="Project Details" description='Details of the project you are added in'/>
                    <h2 className='text-lg flex items-center gap-2 font-semibold'>{projectMember?.name}<User/></h2>
                </div>
                <Separator/>
                 

                <Card className='mt-10 h-full'>
                    <CardHeader>
                        <CardTitle>{project?.name}</CardTitle>
                        <CardDescription>{project?.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3>Located At : <span className='font-semibold'>{project?.location}</span></h3>
                        <h3>Starting Date : <span className='font-semibold'>{project?.startingDate}</span></h3>
                        <h3>Expected Ending Date : <span className='font-semibold'>{project?.endingDate}</span></h3>
                        
                    </CardContent>
                </Card>
            </div>
        </div>
        
    </div>
  )
}

export default ProjectMemberDashboard
