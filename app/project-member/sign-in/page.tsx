"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

const SignInProjectMember = () => {
    const [id,setId] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const router = useRouter();

    const handleLogin = async() => {
        const response = await axios.post('/api/project-member/sign-in',{
            id,
            password
        })
        if(response.status == 200){
            router.push(`/project-member/${response.data.id}`)
        }else{
            setErrorMessage(response.data);
        }
    }
  return (
    <div className='flex items-center justify-center flex-1 space-y-4 p-8 pt-6'>
        <Card className='w-1/2'>
            <CardHeader>
                <CardTitle>Project Member Login</CardTitle>
                <CardDescription>Login to manage your tasks</CardDescription>
                <CardContent>
                    <div className='mt-5'>
                        <Label>Project Member Id</Label>
                        <Input type='text' placeholder='Enter your assigned id' onChange={(e)=>setId(e.target.value)} />
                    </div>
                    <div className='mt-5'>
                        <Label>Password</Label>
                        <Input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className='mt-5' onClick={handleLogin} >Login</Button>
                    <p className='mt-3 font-semibold text-lg text-red-700'>{errorMessage}</p>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
  )
}

export default SignInProjectMember
