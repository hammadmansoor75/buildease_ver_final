import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface ItemProps {
    title : string,
    cost : any
}

const CostItem:React.FC<ItemProps> = ({
    title,
    cost
}) => {
  return (
    <Card className='m-4'>
        <CardHeader className='flex-row justify-between'>
            <div>
                <CardTitle>{title}</CardTitle>
            </div>
            <p className='text-2xl font-bold'>{cost}{' '}PKR</p>
        </CardHeader>
    </Card>
  )
}

export default CostItem
