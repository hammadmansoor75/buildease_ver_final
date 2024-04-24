import { getGraphRevenue } from '@/actions/getGraphRevenue'
import { getTotalMembers } from '@/actions/getTotalMembers'
import { getTotalTasks } from '@/actions/getTotalTasks'
import { getTotalTeams } from '@/actions/getTotalTeams'
import { Overview } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import prismadb from '@/lib/prismadb'
import { Separator } from '@radix-ui/react-separator'
import { CheckCircle, User, Users } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'

interface DashboardPageProps {
    params : {projectId : string}
}

const DashboardPage : React.FC<DashboardPageProps> = async({
    params
}) => {
  const project = await prismadb.project.findFirst({
    where : {
        id : params.projectId
    }
  })

  const totalMembers = await getTotalMembers(params.projectId);
  const totalTeams = await getTotalTeams(params.projectId)
  const totalTasks = await getTotalTasks(params.projectId);
  const graphRevenue = await getGraphRevenue(params.projectId);

   
    
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <Heading title="Dashboard" description='Overview of your project'/>
        
        {/* <Separator/> */}
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Members</CardTitle>
              <User className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
                {totalMembers}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Teams</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
                {totalTeams}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Tasks</CardTitle>
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
                {totalTasks}
            </CardContent>
          </Card>
        </div>

        <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <Overview data={graphRevenue} />
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
