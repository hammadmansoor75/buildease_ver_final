"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project, ProjectMember, Resource, Team } from '@prisma/client';
import { Trash } from 'lucide-react';
import * as z from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModel from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { Select, SelectContent } from '@radix-ui/react-select';
import { SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import prismadb from '@/lib/prismadb';

interface ResourcesFormProps {
    initialData : Resource | null;
    teams : Team[]
}

const formSchema = z.object({
    name : z.string().min(3),
    resourceType : z.string(),
    status : z.string(),
    assignedToTeam : z.string().optional(),
    assignedFrom : z.string().optional(),
    assignedTill : z.string().optional(),
})

type ResourcesFormValues = z.infer<typeof formSchema>


const ResourcesForm : React.FC<ResourcesFormProps> = ({
    initialData,
    teams
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Resource" : "Create a new Resource";
    const description = initialData ? "Edit the resources of your project" : "Add new resources to your project";
    const toastMessage = initialData ? "Resource Updated" : "New Resource Added";
    const action = initialData ? "Save Changes" : "Add";


    const form = useForm<ResourcesFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            resourceType : '',
            status : 'idle',
            assignedToTeam : '',
            assignedTill : '',
            assignedFrom : ''
        }
    })

    const onSubmit = async (data : ResourcesFormValues) => {
       try {
        setLoading(true)
        if(!initialData){
            await axios.post(`/api/${params.projectId}/resources`,data)
        }else{
            console.log(params.memberId)
            await axios.patch(`/api/${params.projectId}/resources/${params.memberId}`,data)
        }
       
        router.refresh();
        router.push(`/${params.projectId}/resources`)
        toast.success(toastMessage)
       } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
       }finally {
        setLoading(false)
       }
    }

    const onDelete = async() => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.projectId}/resources/${params.memberId}`)
            router.refresh()
            router.push('/')
            toast.success("Resource Removed")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
  return (
    <>
        <AlertModel
            isOpen={open}
            onClose={()=> setOpen(false)}
            onConfirm={()=> onDelete()}
            loading={loading}
        />
        <div className='flex items-center justify-between'>
            <Heading title={title} description={description}></Heading>
            {initialData && (
                <Button disabled={loading} variant="destructive" size="icon" onClick={()=> {setOpen(true)}} >
                    <Trash className='h-4 w-4' />
                </Button>
            )}
            
        </div>
        <Separator/>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <div className='grid grid-cols-3 gap-8'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Truck LEF-3040" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name='resourceType'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Resource Type*</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select Resource Type"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='truck'>Truck</SelectItem>
                                        <SelectItem value='heavyMachinery'>Heavy Machinery</SelectItem>
                                        <SelectItem value='pickupVan'>Pick-up Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='status'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Status*</FormLabel>
                            <FormControl>
                                
                            <Select value={field.value}  onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select Resource Status"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='idle'>Idle</SelectItem>
                                        <SelectSeparator/>
                                        <SelectItem value='busy'>Busy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='assignedToTeam'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Assign to a team</FormLabel>
                            <FormControl>
                                
                            <Select value={field.value}  onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select a Team"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='assignedFrom'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>From</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter starting date' type='date' {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='assignedTill'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Till</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter ending date' type='date' {...field} disabled={loading}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                
                </div>
                <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
            </form>
        </Form>
        <Separator/>
    </>
  )
}

export default ResourcesForm
