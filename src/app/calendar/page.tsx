'use client'
import React, { useState } from 'react'
import {
    AddOutlined,
    CalendarMonthOutlined,
    CloseOutlined,
    EditOutlined,
    InfoOutlined,
    SaveOutlined,
} from '@mui/icons-material'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { Button, Divider, Modal, TextField, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import allLocales from '@fullcalendar/core/locales-all'
import useAuth from '@/hooks/useAuth'
import useEvents from '@/hooks/useEvents'
import CalendarModal from '@/components/Modals/CalendarModal'

const FixtureCalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(true)
    const { role } = useAuth()
    const { eventsForCalendar } = useEvents()

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleSubmitEventsForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
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

            {role === 'mister' ||
                (role === 'cap' && (
                    <>
                        <section className="mt-12 flex gap-x-4 justify-end">
                            <Button
                                onClick={() => setIsAddModalOpen(true)}
                                type="button"
                                variant="contained"
                                startIcon={<AddOutlined fontSize="small" />}
                            >
                                Adicionar
                            </Button>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                type="button"
                                variant="outlined"
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

                        <Modal
                            className="flex items-center justify-center"
                            open={isAddModalOpen}
                            onClose={() => setIsAddModalOpen(false)}
                        >
                            <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[50rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex items-center gap-x-2 text-blue-500">
                                        <CalendarMonthOutlined fontSize="small" />
                                        <Typography variant="h5" component="h2">
                                            Adicionar evento
                                        </Typography>
                                    </div>

                                    <form onSubmit={handleSubmitEventsForm} className="mt-12">
                                        <div className="mb-8 flex flex-col gap-y-4 lg:gap-y-6">
                                            <div className="flex flex-col lg:flex-row gap-6 flex-wrap">
                                                <div className="w-full shrink-0">
                                                    <TextField
                                                        required
                                                        name={'title'}
                                                        type="text"
                                                        className="w-full"
                                                        variant="outlined"
                                                        size="small"
                                                        label={'Título'}
                                                        placeholder="Treino"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />

                                                    <Select name="opponent-tactic" size="sm" defaultValue="4-3-3">
                                                        <Option value="4-4-2">4-4-2</Option>
                                                        <Option value="4-3-3">4-3-3</Option>
                                                        <Option value="4-2-3-1">4-2-3-1</Option>
                                                        <Option value="5-2-3">5-2-3</Option>
                                                        <Option value="5-3-2">5-3-2</Option>
                                                        <Option value="5-2-3">5-2-3</Option>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-[3fr_1fr_1fr] gap-4">
                                                    <TextField
                                                        required
                                                        name={'date'}
                                                        type="date"
                                                        variant="outlined"
                                                        size="small"
                                                        label={'Data'}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <TextField
                                                        required
                                                        name={'start'}
                                                        type="text"
                                                        variant="outlined"
                                                        size="small"
                                                        label={'Início'}
                                                        placeholder="15:00"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <TextField
                                                        required
                                                        name={'end'}
                                                        type="text"
                                                        variant="outlined"
                                                        size="small"
                                                        label={'Fim'}
                                                        placeholder="16:30"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                                            <Button
                                                onClick={() => setIsAddModalOpen(false)}
                                                color="error"
                                                variant="outlined"
                                                startIcon={<CloseOutlined fontSize="small" />}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                startIcon={<SaveOutlined fontSize="small" />}
                                                onClick={() => setTimeout(() => setIsAddModalOpen(false), 1500)}
                                            >
                                                Guardar
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </>
                ))}
        </>
    )
}

export default FixtureCalendarPage
