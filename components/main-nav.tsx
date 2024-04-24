"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const MainNav = ({
    className,
    ...props
} : React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href : `/${params.projectId}`,
            label : "Overview",
            active : pathname === `/${params.projectId}`,
        }
        ,{
            href : `/${params.projectId}/settings`,
            label : "Settings",
            active : pathname === `/${params.projectId}/settings`,
        },
        {
            href : `/${params.projectId}/members`,
            label : "Members",
            active : pathname === `/${params.projectId}/members`,
        },
        {
            href : `/${params.projectId}/teams`,
            label : "Teams",
            active : pathname === `/${params.projectId}/teams`,
        },
        {
            href : `/${params.projectId}/tasks`,
            label : "Tasks",
            active : pathname === `/${params.projectId}/tasks`,
        },
        {
            href : `/${params.projectId}/resources`,
            label : "Resources",
            active : pathname === `/${params.projectId}/resources`,
        },
        {
            href : `/${params.projectId}/costestimation`,
            label : "Estimate Cost",
            active : pathname === `/${params.projectId}/costestimation`,
        },
        {
            href : `/${params.projectId}/floormaps`,
            label : "Generate Floor Maps",
            active : pathname === `/${params.projectId}/floormaps`,
        },
        {
            href : `/${params.projectId}/outsource`,
            label : "Service Providers",
            active : pathname === `/${params.projectId}/outsource`,
        }
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

export default MainNav
