'use client'
import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import AuthContextProvider from '@/context/AuthContext'
import PlayersContextProvider from '@/context/PlayersContext'
import FinesContextProvider from '@/context/FinesContext'

const Contexts = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            <AuthContextProvider>
                <PlayersContextProvider>
                    <FinesContextProvider>{children}</FinesContextProvider>
                </PlayersContextProvider>
            </AuthContextProvider>
        </AppRouterCacheProvider>
    )
}

export default Contexts
