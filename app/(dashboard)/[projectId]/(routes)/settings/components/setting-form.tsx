"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project } from '@prisma/client';
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

interface SettingsFormProps {
    initialData : Project;
}

const formSchema = z.object({
    name : z.string().min(3),
    description : z.string().min(10),
    location : z.string().min(5),
    startingDate : z.string(),
    endingDate : z.string()
})

type SettingsFormValues = z.infer<typeof formSchema>


const SettingsForm : React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const router = useRouter();
    const form = useForm<SettingsFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData
    })

    const onSubmit = async (data : SettingsFormValues) => {
       try {
        setLoading(true)
        await axios.patch(`/api/projects/${params.projectId}`,data)
        router.refresh();
        toast.success("Project Updated")
       } catch (error) {
        toast.error("Something went wrong")
       }finally {
        setLoading(false)
       }
    }

    const onDelete = async() => {
        try {
            setLoading(true)
            await axios.delete(`/api/projects/${params.projectId}`)
            router.refresh()
            router.push('/')
            toast.success("Project Deleted")
        } catch (error) {
            toast.error("Make sure to remove the teams first.")
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
            <Heading title="Settings" description='Manage Project Preferences'></Heading>
            <Button disabled={loading} variant="destructive" size="icon" onClick={()=> {setOpen(true)}} >
                <Trash className='h-4 w-4' />
            </Button>
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
                        <Input disabled={loading} placeholder="G-13 Project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Parkfacing House' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='location'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Islamabad' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

<FormField
                                control={form.control}
                                name='startingDate'
                                render={({field}) => (
                                    <FormItem className='mt-3'>
                                        <FormLabel>Starting Date</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type='date' placeholder='' {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='endingDate'
                                render={({field}) => (
                                    <FormItem className='mt-3'>
                                        <FormLabel>Expected Ending Date</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type='date' placeholder='' {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                
                </div>
                <Button disabled={loading} className='ml-auto' type='submit'>Save Changes</Button>
            </form>
        </Form>
        <Separator/>
        <ApiAlert
            title = "test"
            description = "test-desc"
            variant = "public"
        />
    </>
  )
}

export default SettingsForm
