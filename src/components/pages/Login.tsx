'use client'
import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { Button, TextField, Typography } from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { setCookie } from '@/utils/cookies'

const Login = () => {
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const { setAuthentication, isAuthenticated, setRole } = useAuth()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    if (isAuthenticated) redirect('/')

    const toggleVisibility = () => setIsPasswordVisible((prev) => !prev)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true)
        e.preventDefault()

        try {
            const request = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user,
                    password,
                }),
            })
            const requestJson = await request.json()
            const { status } = requestJson
            console.log(requestJson)

            if (status === 307) {
                setAuthentication(true)
                setIsSubmitting(false)
                setRole(requestJson.role)
                setCookie('isAuth', 't')
            }

            if (status === 401) {
                setErrorMessage(requestJson.message)
                setIsSubmitting(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkError = (matchWords: string) => {
        if (errorMessage.toLowerCase().includes(matchWords.toLowerCase()))
            return true

        return false
    }

    return (
        <main>
            <section className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                <Typography
                    variant="inherit"
                    className="font-semibold leading-none w-full text-center"
                >
                    Entrar
                </Typography>
            </section>
            <section className="mt-12 md:max-w-md md:mx-auto">
                <form
                    onSubmit={onSubmit}
                    className="w-full flex flex-col gap-y-8"
                >
                    <TextField
                        onChange={(e) => setUser(e.target.value)}
                        required
                        label="Utilizador"
                        variant="outlined"
                        className="w-full"
                        error={checkError('username')}
                        helperText={checkError('username') && errorMessage}
                    />
                    <div className="relative">
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type={isPasswordVisible ? 'text' : 'password'}
                            label="Password"
                            variant="outlined"
                            className="w-full"
                            error={checkError('password')}
                            helperText={checkError('password') && errorMessage}
                        />
                        <Button
                            onClick={toggleVisibility}
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                            {isPasswordVisible ? (
                                <VisibilityOffOutlined fontSize="medium" />
                            ) : (
                                <VisibilityOutlined fontSize="medium" />
                            )}
                        </Button>
                    </div>
                    <Button
                        disabled={isSubmitting ? true : false}
                        type="submit"
                        variant="contained"
                    >
                        Entrar
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default Login
