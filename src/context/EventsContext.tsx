import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FinesModel } from '@/types'
import { Event } from '@/models/events'
import { EventSourceInput } from '@fullcalendar/core/index.js'

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

    useEffect(() => {
        const getEvents = async () => {
            const request = await fetch('/api/events')
            const response = await request.json()

            setEvents(response.events)
        }

        getEvents()
    }, [])

    return (
        <EventsContext.Provider value={{ events, setEvents, eventsForCalendar, setEventsForCalendar }}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider
