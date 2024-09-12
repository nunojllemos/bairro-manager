import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Event } from '@/models/events'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { capitalize, OPTIONS } from '@/utils'
import usePlayers from '@/hooks/usePlayers'

export type Role = 'fine' | 'mister' | 'cap' | null

interface IEventsContextProps {
    children: any
}

interface IEventsContext {
    events: Event[]
    setEvents: Dispatch<SetStateAction<Event[]>>
    eventsForCalendar: EventSourceInput
    setEventsForCalendar: Dispatch<SetStateAction<EventSourceInput>>
}

export const EventsContext = createContext<IEventsContext>({
    events: [],
    setEvents: () => console.log(''),
    eventsForCalendar: [],
    setEventsForCalendar: () => console.log(''),
})

const EventsContextProvider = ({ children }: IEventsContextProps) => {
    const [events, setEvents] = useState<Event[]>([])
    const [eventsForCalendar, setEventsForCalendar] = useState<EventSourceInput>([])
    const { players } = usePlayers()

    useEffect(() => {
        const getEvents = async () => {
            const request = await fetch('/api/events')
            const { events } = await request.json()

            setEvents(events)
        }

        getEvents()
    }, [])

    useEffect(() => {
        const mappedEvents = events.map((event) => ({
            title: `${OPTIONS[event.type].emoji} ${event.title}`,
            start: new Date(`${event.date}T${event.start}`),
            end: new Date(`${event.date}T${event.end}`),
            color: OPTIONS[event.type].color,
        }))

        const mappedAnniversaries = players.map((player) => ({
            color: OPTIONS.anniversary.color || 'red',
            title: `${OPTIONS.anniversary.emoji} ${capitalize(player.name)}`,
            rrule: {
                freq: 'yearly',
                dtstart: player.dob,
            },
        }))

        setEventsForCalendar([...mappedAnniversaries, ...mappedEvents])
    }, [events, players])

    return (
        <EventsContext.Provider value={{ events, setEvents, eventsForCalendar, setEventsForCalendar }}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider
