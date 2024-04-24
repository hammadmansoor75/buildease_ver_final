"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ProjectMember } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProjectMemberColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface ProjectMemberProps{
    data : ProjectMemberColumn[]
}

const MembersClient : React.FC<ProjectMemberProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading 
                title = {`Project Members (${data.length})`}
                description = "Manage members of your project"
            />
            <Button onClick={() => router.push(`/${params.projectId}/members/new`)}>
                <Plus className='mr-2 h-4 w-4' />
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey='name' columns={columns} data={data} />
    </>
  )
}

export default MembersClient
