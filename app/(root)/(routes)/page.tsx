"use client"
import { useProjectModal } from '@/hooks/use-project-modal'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect } from 'react'

export default function SetupPage() {
  const onOpen = useProjectModal((state) => state.onOpen)
  const isOpen = useProjectModal((state) => state.isOpen)
  useEffect(()=>{
    if(! isOpen){
      onOpen()
    }
  }, [isOpen,onOpen])
  return (
   <div className='p-4'>
    Root Page
   </div>
  )
}
