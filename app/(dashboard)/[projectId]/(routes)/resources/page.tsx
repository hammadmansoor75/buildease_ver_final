import React from 'react';
import prismadb from '@/lib/prismadb';
import ResourcesClient from './components/client';

const Resources = async ({ params }) => {
  const resources = await prismadb.resource.findMany({
    where: {
      projectId: params.projectId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedResources = resources.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    assignedToTeam: item.assignedToTeam,
    assignedFrom: item.assignedFrom,
    assignedTill: item.assignedTill
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ResourcesClient data={formattedResources} />
      </div>
    </div>
  );
};

export default Resources;
