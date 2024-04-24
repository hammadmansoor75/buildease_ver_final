"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project, ProjectMember, Team } from '@prisma/client';
import { Trash } from 'lucide-react';
import * as z from 'zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModel from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import prismadb from '@/lib/prismadb';

interface TeamsFormProps {
    initialData : Team | null;
    projectMembers : ProjectMember[]
}

const formSchema = z.object({
    name : z.string().min(3),
    teamLeaderId : z.string(),
    teamMembers : z.array(z.string())
})

type TeamsFormValues = z.infer<typeof formSchema>


const TeamsForm : React.FC<TeamsFormProps> = ({
    initialData,
    projectMembers
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Team" : "Create Team";
    const description = initialData ? "Edit a team" : "Add a new team to manage tasks";
    const toastMessage = initialData ? "Team Updated" : "Team Created";
    const action = initialData ? "Save Changes" : "Create";
    console.log(projectMembers)

    const form = useForm<TeamsFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            teamLeaderId : '',
            teamMembers : []
        }
    })

    const onSubmit = async (data : TeamsFormValues) => {
       try {
        setLoading(true)
        if(!initialData){
            console.log(data)
            await axios.post(`/api/${params.projectId}/teams`,data)
        }else{
            console.log(params.teamId)
            await axios.patch(`/api/${params.projectId}/teams/${params.teamId}`,data)
        }
       
        router.refresh();
        router.push(`/${params.projectId}/teams`)
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
            await axios.delete(`/api/${params.projectId}/teams/${params.teamId}`)
            router.refresh()
            router.push('/')
            toast.success("Team Removed")
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
        ></AlertModel>
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Team A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name='teamLeaderId'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Team Leader</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Enter Team Leader ID' {...field}/>
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
export default TeamsForm
