import { useContext, useEffect } from 'react'
import { EventsContext } from '@/context/EventsContext'

const useEvents = () => {
    const { events, setEvents, eventsForCalendar } = useContext(EventsContext)

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
