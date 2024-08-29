import { Event } from '@/models/events'
import { capitalize, OPTIONS } from '@/utils'
import { useContext, useEffect, useState } from 'react'
import usePlayers from './usePlayers'
import { EventsContext } from '@/context/EventsContext'

interface EventCalendar {
    _id: string
    title: string
    date: string
    start: Date
    end: Date
    type: string
}

const useEvents = () => {
    const { players } = usePlayers()
    const { events, setEvents, setEventsForCalendar, eventsForCalendar } = useContext(EventsContext)

    useEffect(() => {
        const mappedEvents = events.map((event) => ({
            title: `${OPTIONS[event.type].emoji} ${event.title}`,
            start: new Date(`${event.date}T${event.start}`),
            end: new Date(`${event.date}T${event.end}`),
            color: OPTIONS[event.type].color,
        }))

        const mappedAnniversaries = players.map((player) => ({
            color: OPTIONS.anniversary.color,
            title: `${OPTIONS.anniversary.emoji} ${capitalize(player.name)}`,
            rrule: {
                freq: 'yearly',
                dtstart: player.dob,
            },
        }))

        setEventsForCalendar([...mappedAnniversaries, ...mappedEvents])
    }, [events, players])

    useEffect(() => {
        const getEvents = async () => {
            const request = await fetch('/api/events')
            const response = await request.json()

            setEvents(response.events)
        }

        getEvents()
    }, [])

    return { events, setEvents, eventsForCalendar }
}

export default useEvents
