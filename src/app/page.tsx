'use client'
import React from 'react'
import { redirect } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { Typography } from '@mui/material'
import { EmojiPeopleOutlined } from '@mui/icons-material'

const DashboardPage = () => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) redirect('/login')

    return (
        <section>
            <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                <EmojiPeopleOutlined fontSize="inherit" />
                <Typography variant="inherit" className="font-semibold leading-none">
                    Olá, <span className="capitalize">{user?.username}</span>
                </Typography>
            </div>
        </section>
    )
}

export default DashboardPage
