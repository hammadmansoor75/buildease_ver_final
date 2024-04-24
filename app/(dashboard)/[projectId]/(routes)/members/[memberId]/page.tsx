import prismadb from '@/lib/prismadb'
import React from 'react'
import MembersForm from './components/members-form'

const MembersPage = async({
    params
} : {
    params : {memberId : string}
}) => {
    const projectMember = await prismadb.projectMember.findUnique({
        where : {
            id : params.memberId
        }
    })


  return (
   <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
        <MembersForm initialData={projectMember} />
    </div>
   </div>
  )
}

export default MembersPage
