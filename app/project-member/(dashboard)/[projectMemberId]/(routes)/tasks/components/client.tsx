"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ProjectMember } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { TasksColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface ProjectMemberProps{
    data : TasksColumn[]
}

const TasksClient : React.FC<ProjectMemberProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading 
                title = {`Tasks (${data.length})`}
                description = "Tasks assigned to you"
            />
        </div>
        <Separator/>
        <DataTable searchKey='title' columns={columns} data={data} />
    </>
  )
}

export default TasksClient
