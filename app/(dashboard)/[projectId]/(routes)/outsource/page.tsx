"use client"
import {OutsourceCard} from '@/components/outsource-card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { serviceProviders } from './data'

const OutSource = () => {

  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title="Outsource" description='Outsource your tasks to professionals'></Heading>
    </div>
    <Separator />
    <div className='flex flex-wrap items-center gap-10 space-y-4 p-8 pt-6'>

        {serviceProviders.map((provider) => (
            <OutsourceCard 
            key={provider.key}
            serviceName={provider.name}
            providedBy={provider.serviceOfferedBy}
            hourlyRate={provider.hourlyRate}
            description={provider.description}
            contactEmail = {provider.email}
            contactPhone = {provider.phone}
            ></OutsourceCard>
        ))}
        
    </div>
    
   </div>
  )
}

export default OutSource
