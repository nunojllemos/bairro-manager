'use client'
import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { Button, TextField, Typography } from '@mui/material'

const Login = () => {
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const { checkAuthStatus, setIsAuthenticated, isAuthenticated } = useAuth()

    useEffect(() => {
        // checkAuthStatus()
    }, [isAuthenticated])

    const onSubmit = async () => {
        // CHECK FORM AUTH DATA
        setTimeout(() => {}, 3000)

        if (password === '1234' && user === 'mister') {
            setIsAuthenticated(true)
            console.log('is authenticated')
            return
        }

        console.log('is NOT authenticated')
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
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        label="Password"
                        variant="outlined"
                        className="w-full"
                    />
                    <Button type="submit" variant="contained">
                        Entrar
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default Login
