"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project, ProjectMember, Task } from '@prisma/client';
import { Trash } from 'lucide-react';
import * as z from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast';
import { redirect, useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModel from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import Link from 'next/link';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';

interface TasksFormProps {
    initialData : Task | null;
    projectMembers : ProjectMember[]
}

const formSchema = z.object({
    title : z.string().min(3),
    desc : z.string().min(5),
    teamId : z.string(),
    startingDate : z.string(),
    endingDate : z.string(),
    budget : z.string(),
    projectMember : z.string(),
    status : z.string(),
})

type TasksFormValues = z.infer<typeof formSchema>


const TasksForm : React.FC<TasksFormProps> = ({
    initialData,
    projectMembers
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Task" : "Create a new task";
    const description = initialData ? "Edit a task" : "Add a new task";
    const toastMessage = initialData ? "Task Updated" : "Task Added";
    const action = initialData ? "Save Changes" : "Add";

    const form = useForm<TasksFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            title : '',
            desc : '',
            teamId : '',
            startingDate : '',
            endingDate : '',
            budget : '',
            projectMember : '',
            status : 'Not Completed'
        }
    })

    const onSubmit = async (data : TasksFormValues) => {
       try {
        setLoading(true)
        console.log(data)
        if(!initialData){
            console.log("POSTING Tasks")
            await axios.post(`/api/${params.projectId}/tasks`,data)
        }else{
            console.log(params.memberId)
            await axios.patch(`/api/${params.projectId}/tasks/${params.taskId}`,data)
        }
       
        router.refresh();
        router.push(`/${params.projectId}/tasks`)
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
            await axios.delete(`/api/${params.projectId}/tasks/${params.taskId}`)
            router.refresh()
            router.push('/')
            toast.success("Task Removed")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const handleOutsource = () => {
        router.push(`/${params.projectId}/outsource`)
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
            <div className='flex items-center justify-evenly gap-5'>
            {initialData && (
                <Button disabled={loading} variant="destructive" size="icon" onClick={()=> {setOpen(true)}} >
                    <Trash className='h-4 w-4' />
                </Button>
            )}
            <Button disabled={loading} onClick={handleOutsource}>
                Outsource
            </Button>
            </div>
            
        </div>
        <Separator/>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <div className='grid grid-cols-3 gap-8'>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="House Furnishing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name='desc'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Complete the last date furnishing' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='projectMember'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Project Member</FormLabel>
                            <FormControl>   
                                <Input disabled={loading} placeholder='Project Member ID' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name='startingDate'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Starting Date</FormLabel>
                            <FormControl>
                                
                                <Input type='date' disabled={loading} placeholder='Starting Date' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='endingDate'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ending Date</FormLabel>
                            <FormControl>
                                
                                <Input type='date' disabled={loading} placeholder='Ending Date' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='budget'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Budget (PKR)</FormLabel>
                            <FormControl>
                                
                                <Input  disabled={loading} placeholder='20000' {...field}/>
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
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Input  disabled={loading} placeholder='Not Completed' {...field}/>
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

export default TasksForm
