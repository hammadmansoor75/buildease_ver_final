"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project, ProjectMember } from '@prisma/client';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MembersFormProps {
    initialData : ProjectMember | null;
}

const formSchema = z.object({
    name : z.string().min(3),
    email : z.string().email(),
    permission : z.string(),
    password : z.string().min(8)
})

type MembersFormValues = z.infer<typeof formSchema>


const MembersForm : React.FC<MembersFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Project Member" : "Add Project Member";
    const description = initialData ? "Edit a project member" : "Add a new project member";
    const toastMessage = initialData ? "Project Member Updated" : "Project Member Added";
    const action = initialData ? "Save Changes" : "Add";

    const form = useForm<MembersFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            email : '',
            permission : '',
            password : ''
        }
    })

    const onSubmit = async (data : MembersFormValues) => {
       try {
        setLoading(true)
        if(!initialData){
            await axios.post(`/api/${params.projectId}/projectmembers`,data)
        }else{
            console.log(params.memberId)
            await axios.patch(`/api/${params.projectId}/projectmembers/${params.memberId}`,data)
        }
       
        router.refresh();
        router.push(`/${params.projectId}/members`)
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
            await axios.delete(`/api/${params.projectId}/projectmembers/${params.memberId}`)
            router.refresh()
            router.push('/')
            toast.success("Project Member Removed")
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='johndoe@gmail.com' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='permission'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Permisson</FormLabel>
                            <FormControl>
                                <Select value={field.value}  onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select Permission"}></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Team Member'>Team Member</SelectItem>
                                        <SelectItem value='Project Manager'>Project Manager</SelectItem>
                                        <SelectItem value='Project Owner'>Project Owner</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                {/* <Input disabled={loading} placeholder='Team Member' {...field}/> */}
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Password' {...field}/>
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

export default MembersForm
