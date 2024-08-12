'use client'
import React from 'react'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const FixtureCalendarPage = () => {
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

    const mappedAnniversaries = DUMMY_ANNIVERSARIES.map((anniversary) => ({
        title: `🎂 ${anniversary.name} faz anos`,
        start: anniversary.date,
        color: COLORS.anniversaries,
    }))

    const mappedMatches = DUMMY_GAMES.map((match) => ({
        title:
            match.place === 'home'
                ? `⚽️ Bairro x ${match.team}`
                : `⚽️ ${match.team} x Bairro`,
        start: match.date,
        color: COLORS.matches,
    }))

    return (
        <>
            <section>
                <div className="flex items-baseline gap-x-4 text-blue-500">
                    <CalendarMonthOutlined fontSize="large" />
                    <Typography variant="h3" className="font-semibold">
                        Calendário
                    </Typography>
                </div>
                <div className="mt-4">
                    <Typography>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Neque voluptatem vero praesentium molestiae ipsa
                        optio dolor ea labore debitis consectetur necessitatibus
                        nobis voluptates, hic quasi animi adipisci repudiandae
                        corporis dicta?
                    </Typography>
                </div>
            </section>
            <Divider className="my-8" />
            <section>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale="pt"
                    firstDay={1}
                    events={[...mappedAnniversaries, ...mappedMatches]}
                />
            </section>
            <Divider className="mt-16" />
            <section className="mt-4 text-sm">
                <span className="text-blue-500">Legenda</span>
                <ul className="flex gap-x-8 mt-6">
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span>Aniversários</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-3 h-3 rounded-full bg-blue-400"></span>
                        <span>Treinos</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-3 h-3 rounded-full bg-green-600"></span>
                        <span>Jogos</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <span className="inline-block grow-0 w-3 h-3 rounded-full bg-slate-600"></span>
                        <span>Outros</span>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default FixtureCalendarPage
