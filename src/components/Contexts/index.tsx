'use client'
import React from 'react'
import AuthContextProvider from '@/context/AuthContext'
import PlayersContextProvider from '@/context/PlayersContext'
import FinesContextProvider from '@/context/FinesContext'

const Contexts = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <PlayersContextProvider>
                <FinesContextProvider>{children}</FinesContextProvider>
            </PlayersContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
