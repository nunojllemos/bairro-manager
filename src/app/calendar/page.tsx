'use client'
import React, { useState } from 'react'
import { CalendarMonthOutlined, EditOutlined, InfoOutlined } from '@mui/icons-material'
import { Button, Divider, Modal, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import allLocales from '@fullcalendar/core/locales-all'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import useEvents from '@/hooks/useEvents'
import CalendarModal from '@/components/Modals/CalendarModal'

const FixtureCalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAuthenticated, role } = useAuth()
    const { eventsForCalendar } = useEvents()

    if (!isAuthenticated) redirect('/login')

    const handleClose = () => {
        setIsModalOpen(false)
    }

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
                        {'⚠️'} O calendário é um organismo vivo e pode ser alterado ao longo da época.
                    </Typography>
                </div>
            </section>
            <Divider className="!my-8" />

            <section className="mt-4 mb-12 text-sm">
                <span className="text-blue-500 flex items-center gap-x-2">
                    <InfoOutlined fontSize="inherit" /> Legenda
                </span>
                <ul className="flex flex-row gap-4 flex-wrap lg:gap-16 mt-3 md:mt-6">
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
                        <span className="inline-block grow-0 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-slate-600"></span>
                        <span>Outros</span>
                    </li>
                </ul>
            </section>

            <section className="text-sm md:text-base">
                <FullCalendar
                    key={eventsForCalendar.toString()}
                    initialView="listWeek"
                    plugins={[rrulePlugin, dayGridPlugin, listPlugin]}
                    headerToolbar={{ start: 'title', end: 'prev,next' }}
                    views={{
                        listWeek: {
                            titleFormat: { day: '2-digit', month: 'short' },
                            titleRangeSeparator: ' a ',
                        },
                    }}
                    locales={allLocales}
                    locale="pt-PT"
                    firstDay={1}
                    events={eventsForCalendar}
                />
            </section>

            {role === 'mister' && (
                <>
                    <section className="mt-12 flex justify-end">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            type="button"
                            variant="contained"
                            startIcon={<EditOutlined fontSize="small" />}
                        >
                            Editar
                        </Button>
                    </section>
                    <Modal
                        className="flex items-center justify-center"
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <CalendarModal handleClose={handleClose} />
                    </Modal>
                </>
            )}
        </>
    )
}

export default FixtureCalendarPage
