'use client'
import React from 'react'
import AuthContextProvider from '@/context/AuthContext'
import PlayersContextProvider from '@/context/PlayersContext'
import FinesContextProvider from '@/context/FinesContext'
import EventsContextProvider from '@/context/EventsContext'

const Contexts = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <PlayersContextProvider>
                <EventsContextProvider>
                    <FinesContextProvider>{children}</FinesContextProvider>
                </EventsContextProvider>
            </PlayersContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
