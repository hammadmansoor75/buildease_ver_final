"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const ProjectMemberMainNav = ({
    className,
    ...props
} : React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href : `/project-member/${params.projectMemberId}`,
            label : "Project Details",
            active : pathname === `/${params.projectMemberId}`,
        },
        {
            href : `/project-member/${params.projectMemberId}/teams`,
            label : "Teams",
            active : pathname === `/project-member/${params.projectMemberId}/teams`,
        },
        {
            href : `/project-member/${params.projectMemberId}/tasks`,
            label : "Tasks",
            active : pathname === `/project-member/${params.projectMemberId}/tasks`,
        },
        
    ]
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {routes.map((route) => (
            <Link
                href={route.href}
                key={route.href}
                className={cn("text-sm font-medium transition-colors hover:text-primary", 
                route.active ? "text-black dark:text-white" : "text-muted-foreground")}
            >{route.label}</Link>
        ))}
    </nav>
  )
}

export default ProjectMemberMainNav
