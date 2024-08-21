'use client'
import React from 'react'
import { redirect } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

const DashboardPage = () => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) redirect('/login')

    return <div>DashboardPage</div>
}

export default DashboardPage
