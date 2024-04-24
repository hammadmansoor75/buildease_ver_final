"use client"
import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import ProjectSwitcher from './project-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import ProjectMemberMainNav from './project-member-mainNav'


const ProjectMemberNavbar = () => {
    const handleLogout = () => {
        redirect('/');
    }
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <ProjectMemberMainNav className='mx-6'/>
            <div className='ml-auto flex items-center space-x-4'>
                <ThemeToggle/>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
     
    </div>
  )
}

export default ProjectMemberNavbar
