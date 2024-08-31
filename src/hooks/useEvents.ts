import { useContext, useEffect } from 'react'
import { EventsContext } from '@/context/EventsContext'

const useEvents = () => {
    const { events, setEvents, eventsForCalendar } = useContext(EventsContext)

    return { events, setEvents, eventsForCalendar }
}

export default useEvents
