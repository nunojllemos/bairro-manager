import useEvents from '@/hooks/useEvents'
import { Event } from '@/models/events'
import {
    capitalize,
    cleanObject,
    isDatePast,
    mapEventsToPortuguese,
    mapPortugueseEventToDatabaseName,
    OPTIONS,
} from '@/utils'
import {
    CalendarMonthOutlined,
    CloseOutlined,
    EditOutlined,
    ExpandMoreOutlined,
    SaveOutlined,
} from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'

interface CalendarModalProps {
    handleClose: () => void
}

const CalendarModal = ({ handleClose }: CalendarModalProps) => {
    const { events, setEvents } = useEvents()

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const data = events
            .filter((event) => !isDatePast(`${event.date}T${event.start}:00`))
            .map((event) => {
                const form = new FormData(document.getElementById(event._id) as HTMLFormElement)

                const hasFormBeingEdited =
                    !!form.get('title') ||
                    !!form.get('date') ||
                    !!form.get('start') ||
                    !!form.get('end') ||
                    !!form.get('type')

                if (!hasFormBeingEdited) return {}

                const eventData = {
                    _id: event._id,
                    title: form.get('title') || null,
                    date: form.get('date') || null,
                    start: form.get('start') || null,
                    end: form.get('end') || null,
                    type: mapPortugueseEventToDatabaseName(form.get('type') as string | null) || null,
                }

                return cleanObject(eventData)
            })
            .filter((event) => !!Object.keys(event).length)
            .map((event) => event)

        const request = await fetch('/api/events', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })

        const response = await request.json()

        setEvents(response.events)
        handleClose()
    }

    return (
        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[50rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto">
            <div className="flex flex-col gap-y-4">
                <Typography className="capitalize" variant="h5" component="h2">
                    <span className="flex items-center gap-x-2 leading-none">
                        <CalendarMonthOutlined fontSize="medium" /> Eventos
                    </span>
                </Typography>
                <span className="font-light text-sm p-2 md:py-4 md:px-6 rounded-lg bg-yellow-100 text-yellow-800">
                    {'⚠️'} Só aparecem eventos futuros.
                </span>
            </div>
            <ul className="flex flex-col md:gap-y-4 mt-8 md:mt-16 w-full h-[40vh] md:h-auto z-[1] relative">
                {events
                    .filter((event) => !isDatePast(`${event.date}T${event.start}`))
                    .map((event) => {
                        return (
                            <li key={`${event.title}`} className="pb-4 md:pb-0">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreOutlined fontSize="small" />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-y-1 md:gap-x-2">
                                            <span className="text-xs md:text-sm font-light text-slate-400">
                                                {new Date(event.date).toLocaleDateString('pt-PT')}
                                            </span>
                                            <span className="text-xs md:text-sm font-medium">
                                                {OPTIONS[event.type].emoji} {event.title}
                                            </span>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className="pb-8">
                                        <Divider />
                                        <span className="pt-4 text-xs text-blue-500 flex items-center gap-x-1">
                                            <EditOutlined fontSize="inherit" /> Editar evento
                                        </span>
                                        <form id={event._id}>
                                            <div className="pt-6">
                                                <TextField
                                                    name="title"
                                                    type="string"
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    label="Título"
                                                    placeholder={event.title}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <div className="pt-6 flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                                                <TextField
                                                    name="date"
                                                    type="date"
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    label="Data"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    name="start"
                                                    type="string"
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    label="Começa"
                                                    placeholder={event.start}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <TextField
                                                    name="end"
                                                    type="string"
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    label="Acaba"
                                                    placeholder={event.end}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <div className="pt-6 relative">
                                                <span className="absolute bg-white block z-[2] text-gray-500 text-xs p-1 top-3 left-3">
                                                    Tipo
                                                </span>
                                                <Select
                                                    name="type"
                                                    labelId="label"
                                                    size="small"
                                                    displayEmpty
                                                    onChange={() => {}}
                                                    className="w-full text-sm"
                                                >
                                                    {mapEventsToPortuguese().map((type) => (
                                                        <MenuItem
                                                            key={type}
                                                            value={capitalize(type as string)}
                                                            className="capitalize text-sm"
                                                        >
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </form>
                                    </AccordionDetails>
                                </Accordion>
                            </li>
                        )
                    })}
            </ul>
            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                <Button
                    onClick={handleClose}
                    color="error"
                    variant="outlined"
                    startIcon={<CloseOutlined fontSize="small" />}
                >
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" startIcon={<SaveOutlined fontSize="small" />}>
                    Guardar
                </Button>
            </div>
        </div>
    )
}

export default CalendarModal
