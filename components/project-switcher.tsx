"use client"
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Project } from '@prisma/client'
import { useProjectModal } from '@/hooks/use-project-modal'
import { useParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, FolderDot, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandInput, CommandItem, CommandList } from './ui/command'
import { CommandEmpty, CommandGroup, CommandSeparator } from 'cmdk'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface ProjectSwitcherProps extends PopoverTriggerProps {
    items : Project[]
}

const ProjectSwitcher = ({
    className,
    items = []
} : ProjectSwitcherProps) => {
    const projectModal = useProjectModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label : item.name,
        value : item.id
    }))

    const currentProject = formattedItems.find((item) => item.value === params.projectId)

    const [open,setOpen] = useState(false);
    const onProjectSelect = (project : {value : string, label : string}) => {
        setOpen(false)
        router.push(`/${project.value}`)
    }
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                role='combobox'
                aria-expanded={open}
                aria-label='Select a project'
                className={cn("w-[200px] justify-between",className)}
            >
                <FolderDot className='mr-2 h-4 w-4'></FolderDot>
                {currentProject?.label}
                <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50'></ChevronsUpDown>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
            <Command>
                <CommandList>
                    <CommandInput placeholder='Search Project...' />
                    <CommandEmpty>No Project Found.</CommandEmpty>
                    <CommandGroup heading="Projects">
                        {formattedItems.map((project) =>  (
                            <CommandItem
                                key={project.value}
                                onSelect={()=>onProjectSelect(project)}
                                className='text-sm'
                            >
                                <FolderDot className='mr-2 h-4 w-4'></FolderDot>
                                {project.label}
                                <Check
                                    className={cn("ml-auto h-4 w-4",
                                    currentProject?.value === project.value ? "opacity-100" : "opacity-0")}
                                />

                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            onSelect={()=> {
                                setOpen(true)
                                projectModal.onOpen()
                            }}
                        >
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Create Project
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}

export default ProjectSwitcher
