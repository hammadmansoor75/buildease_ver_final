import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface ItemProps {
    title : string,
    quantity : any,
    quantityUnit : string,
}

const Item:React.FC<ItemProps> = ({
    title,
    quantity,
    quantityUnit,
}) => {
  return (
    <Card className='m-4'>
        <CardHeader className='flex-row justify-between'>
            <div>
                <CardTitle>{title}</CardTitle>
            </div>
            <p className='text-2xl font-bold'>{quantity}{' '}{quantityUnit}</p>
        </CardHeader>
    </Card>
  )
}

export default Item
