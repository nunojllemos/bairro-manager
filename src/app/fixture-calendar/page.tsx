'use client'
import React from 'react'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'

const FixtureCalendarPage = () => {
    const { isAuthenticated } = useAuth()
    const { players } = usePlayers()

    if (!isAuthenticated) redirect('/login')

    const COLORS = {
        others: '#475569',
        matches: '#16a34a',
        training: '#60a5fa',
        anniversaries: '#facc15',
    }

    const DUMMY_ANNIVERSARIES = [
        {
            name: 'Coruja',
            date: '2024-08-25',
        },
    ]

    const DUMMY_TRAINING_SESSIONS = [
        {
            name: 'Treino',
            date: {
                start: '2024-08-05T20:00:00',
                end: '2024-08-05T21:30:00',
            },
        },
        {
            name: 'Treino',
            date: {
                start: '2024-08-07T20:00:00',
                end: '2024-08-07T21:30:00',
            },
        },
        {
            name: 'Treino',
            date: {
                start: '2024-08-09T20:00:00',
                end: '2024-08-09T21:30:00',
            },
        },
        {
            name: 'Treino',
            date: {
                start: '2024-08-12T20:00:00',
                end: '2024-08-12T21:30:00',
            },
        },
        {
            name: 'Treino',
            date: {
                start: '2024-08-14T20:00:00',
                end: '2024-08-14T21:30:00',
            },
        },
        {
            name: 'Treino',
            date: {
                start: '2024-08-16T20:00:00',
                end: '2024-08-16T21:30:00',
            },
        },
    ]

    const DUMMY_GAMES = [
        {
            team: 'Ponte',
            date: '2024-08-25',
            place: 'home',
        },
        {
            team: 'Cabreiros',
            date: '2024-08-18',
            place: 'away',
        },
    ]

    const mappedTrainingSessions = DUMMY_TRAINING_SESSIONS.map((session) => ({
        title: `⚽️ ${session.name}`,
        start: session.date.start,
        end: session.date.end,
        color: COLORS.training,
    }))

    const mappedAnniversaries = players.map((player) => ({
        title: `🎂 ${player.name} faz anos`,
        start: player.dob,
        color: COLORS.anniversaries,
    }))

    const mappedMatches = DUMMY_GAMES.map((match) => ({
        title: match.place === 'home' ? `🏆 Bairro x ${match.team}` : `🏆 ${match.team} x Bairro`,
        start: match.date,
        color: COLORS.matches,
    }))

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <CalendarMonthOutlined fontSize="inherit" />
                    <Typography variant="inherit" className="font-semibold leading-none">
                        Calendário
                    </Typography>
                </div>
                <div className="mt-4">
                    <Typography>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptatem vero praesentium
                        molestiae ipsa optio dolor ea labore debitis consectetur necessitatibus nobis voluptates, hic
                        quasi animi adipisci repudiandae corporis dicta?
                    </Typography>
                </div>
            </section>
            <Divider className="!my-8" />
            <section>
                <FullCalendar
                    initialView="listWeek"
                    plugins={[dayGridPlugin, listPlugin]}
                    headerToolbar={{ start: 'title', end: 'prev,next' }}
                    views={{
                        listWeek: {
                            titleFormat: { day: '2-digit', month: 'short' },
                            titleRangeSeparator: ' a ',
                        },
                    }}
                    locale="pt"
                    firstDay={1}
                    events={[...mappedAnniversaries, ...mappedMatches, ...mappedTrainingSessions]}
                />
            </section>
            <Divider className="!mt-16" />
            <section className="mt-4 text-sm">
                <span className="text-blue-500">Legenda</span>
                <ul className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-6">
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-400"></span>
                        <span>Aniversários</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-blue-400"></span>
                        <span>Treinos</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-600"></span>
                        <span>Jogos</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-slate-600 bg-slate-100"></span>
                        <span>Outros</span>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default FixtureCalendarPage
