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
                <CoachesContextProvider>
                    <EventsContextProvider>
                        <FinesContextProvider>
                            <GamesContextProvider>{children}</GamesContextProvider>
                        </FinesContextProvider>
                    </EventsContextProvider>
                </CoachesContextProvider>
            </PlayersContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
