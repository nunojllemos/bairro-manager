'use client'
import React from 'react'
import AuthContextProvider from '@/context/AuthContext'
import PlayersContextProvider from '@/context/PlayersContext'
import FinesContextProvider from '@/context/FinesContext'
import EventsContextProvider from '@/context/EventsContext'
import CoachesContextProvider from '@/context/CoachesContext'
import GamesContextProvider from '@/context/GamesContext'

const Contexts = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <PlayersContextProvider>
                <EventsContextProvider>
                    <CoachesContextProvider>
                        <FinesContextProvider>
                            <GamesContextProvider>{children}</GamesContextProvider>
                        </FinesContextProvider>
                    </CoachesContextProvider>
                </EventsContextProvider>
            </PlayersContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
