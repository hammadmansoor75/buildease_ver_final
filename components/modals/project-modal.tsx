import { useProjectModal } from '@/hooks/use-project-modal';
import React,{useState} from 'react'
import { Modal } from '../ui/modal';
import * as z from 'zod'
import {useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import {toast} from 'react-hot-toast'

const formSchema = z.object({
    name : z.string().min(3),
    description : z.string().min(10),
    location : z.string().min(5),
    startingDate : z.string(),
    endingDate : z.string()
})

const ProjectModal = () => {
    const projectModal = useProjectModal();
    const [loading,setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
            description : "",
            location : "",
        }
    })

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
       try {
        setLoading(true)
        const response = await axios.post('/api/projects' , values)
        toast.success("Project Created")
        window.location.assign(`/${response.data.id}`)
       } catch (error) {
        toast.error("Something Went Wrong")
       } finally {
        setLoading(false)
       }
    }
  return (
    <Modal
     title='Create Project'
     description='Add a new project to streamline your home construction'
     isOpen ={projectModal.isOpen}
     onClose={projectModal.onClose}
    >
        <div>
            <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                    <FormItem className='mt-3'>
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
                                    <FormItem className='mt-3'>
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
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button  disabled={loading} variant="outline" onClick={projectModal.onClose}>
                    Cancel
                  </Button>
                  <Button  disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
            </div>
        </div>
    </Modal>
  )
}

export default ProjectModal
