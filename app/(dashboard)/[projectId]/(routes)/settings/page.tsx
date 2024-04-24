import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './components/setting-form';

interface SettingsPageProps {
    params : {
        projectId : string,
    }
}

const SettingsPage : React.FC<SettingsPageProps> = async({
    params
}) => {
    const {userId} = auth();
    if(!userId) {
        redirect('/sign-in')
    }

    const project = await prismadb.project.findFirst({
        where  : {
            id : params.projectId
        }
    })

    if(!project){
        redirect('/')
    }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={project}/>
      </div>
    </div>
  )
}

export default SettingsPage
