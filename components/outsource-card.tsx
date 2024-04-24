"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'

interface OutsourceCardProps{
    serviceName : String,
    providedBy : String,
    hourlyRate : String,
    description : String,
    contactEmail : String,
    contactPhone : String
}

export const OutsourceCard : React.FC<OutsourceCardProps> = ({
    serviceName,
    providedBy,
    hourlyRate,
    description,
    contactEmail,
    contactPhone
}) => {
  return (
    <Card className='w-3/4 h-50'>
        <CardHeader>
            <CardTitle>{serviceName}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className='flex-col'>
                <div className='flex'>
                    <h3 className='text-md font-bold'>Service Offered By:{" "}</h3>
                    <p>{providedBy}</p>
                </div>
                <div className='flex'>
                    <h3 className='text-md font-bold'>Hourly Rate: {" "}</h3>
                    <p>{hourlyRate} PKR</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            
                <div className='flex-col'>
                    <div className='flex'>
                        <h3 className='text-md font-bold'>Email:{" "}</h3>
                        <p>{contactEmail}</p>
                    </div>
                    <div className='flex'>
                        <h3 className='text-md font-bold'>Phone: {" "}</h3>
                        <p>{contactPhone}</p>
                    </div>
                    <div className='mt-4'>
                    <Button>
                        <Link href="https://mail.google.com" target='blank'>
                            Email Now!
                        </Link>
                    </Button>
                </div>
                </div>
                
        </CardFooter>
    </Card>
  )
}

