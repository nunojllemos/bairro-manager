'use client'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Divider,
    Modal,
    Typography,
} from '@mui/material'
import {
    EditAttributesOutlined,
    EditOutlined,
    ExpandMore,
    InfoOutlined,
    SavingsOutlined,
    TrendingDownOutlined,
    TrendingUpOutlined,
} from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect, useRouter } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'
import useFines from '@/hooks/useFines'
import FinesModal from '@/components/Modals/FinesModal'
import { localeStringOptions } from '@/utils'

const createData = (id: string, name: string, url: string, total: string, payed: string, debt: string) => ({
    id,
    name,
    url,
    total,
    payed,
    debt,
})

const FinesPage = () => {
    const { isAuthenticated, role } = useAuth()
    const [playerId, setPlayerId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { players } = usePlayers()
    const { fines } = useFines()

    const handleClose = () => setIsModalOpen(false)

    useEffect(() => {
        const getPlayer = async () => {
            const request = await fetch('/api/players')
            const json = await request.json()
        }

        getPlayer()
    }, [playerId])

    if (!isAuthenticated) redirect('/login')

    const handleEdit = (userId: string) => setPlayerId(userId)

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <SavingsOutlined fontSize="inherit" />
                    <Typography variant="inherit" className="font-semibold leading-none">
                        Multas
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
                <div className="flex py-6 pl-4 pr-6 lg:pl-4 lg:pr-10 justify-between text-blue-500 font-semibold">
                    <span>Nome</span>
                    <div className="flex gap-x-6">
                        <span className="block w-12 lg:w-24 text-center">Total</span>
                        <span className="block w-12 lg:w-24 text-center">Pago</span>
                        <span className="block lg:w-24 text-center">Em dívida</span>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-4 lg:gap-y-2">
                    {players &&
                        players.map((player, index) => {
                            return (
                                <li key={player.name} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                                    <Accordion className="!m-0 !rounded-none1 !shadow-none">
                                        <AccordionSummary className="pr-2" expandIcon={<ExpandMore />}>
                                            <div>
                                                <div className="flex flex-col lg:flex-row items-center gap-y-1 lg:gap-x-4 text-xs lg:text-sm">
                                                    <Avatar src={player.avatar} />
                                                    <span className="capitalize">{player.name}</span>
                                                </div>
                                            </div>
                                            <ul className="flex gap-x-6">
                                                <li className="w-12 lg:w-24 text-center">
                                                    {player.fines.total} &euro;
                                                </li>
                                                <li className="w-12 lg:w-24 text-center text-green-700">
                                                    {player.fines.paid} &euro;
                                                </li>
                                                <li className="w-16 lg:w-24 text-center text-red-700">
                                                    &minus; {player.fines.total - player.fines.paid} &euro;
                                                </li>
                                            </ul>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Divider className="!mb-8 md:!mb-4" />
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                    <InfoOutlined fontSize="inherit" />
                                                    Detalhes
                                                </span>
                                                {role === 'cap' && (
                                                    <Button
                                                        onClick={() => {
                                                            setIsModalOpen(true)
                                                            handleEdit(player._id)
                                                            console.log(player._id)
                                                        }}
                                                        variant="outlined"
                                                        startIcon={<EditOutlined fontSize="small" />}
                                                    >
                                                        Editar
                                                    </Button>
                                                )}
                                            </div>
                                            <ul className="mt-8 md:mt-4 flex flex-col gap-y-1 text-sm lg:pr-6">
                                                {fines &&
                                                    fines.map((fine) => {
                                                        return !Object.keys(fine).includes('values') ? (
                                                            <li
                                                                key={fine._id}
                                                                className="flex justify-between py-2 border-b border-b-slate-100"
                                                            >
                                                                <div>
                                                                    <span className="font-semibold">{fine.name}</span>
                                                                    <span className="inline-block px-2">
                                                                        {
                                                                            player.fines.details
                                                                                .filter(
                                                                                    (detailedFine) =>
                                                                                        detailedFine._id === fine._id
                                                                                )
                                                                                .map((value) => value)[0].value
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="w-16 lg:w-24 text-center">
                                                                    {(
                                                                        player.fines.details
                                                                            .filter(
                                                                                (detailedFine) =>
                                                                                    detailedFine._id === fine._id
                                                                            )
                                                                            .map((value) => value)[0].value *
                                                                        (fine?.value || 1)
                                                                    ).toLocaleString('pt-PT', localeStringOptions)}{' '}
                                                                    &euro;
                                                                </div>
                                                            </li>
                                                        ) : (
                                                            <li
                                                                key={fine._id}
                                                                className="flex justify-between py-2 border-b border-b-slate-100"
                                                            >
                                                                <span className="font-semibold">{fine.name}</span>
                                                                <div className="w-16 lg:w-24 text-center">
                                                                    {/* TODO: utility function to calculate total value from defeats based on matches history */}
                                                                    20,00 &euro;
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </li>
                            )
                        })}
                </ul>
            </section>
            {role === 'cap' && (
                <section className="mt-8">
                    <div className="flex justify-between gap-y-8">
                        <div className="flex items-center gap-x-2 text-green-600">
                            <TrendingUpOutlined fontSize="inherit" />
                            <Typography>200,00€</Typography>
                        </div>
                        <div className="flex items-center gap-x-2 text-red-500">
                            <TrendingDownOutlined fontSize="inherit" />
                            <Typography>300,00€</Typography>
                        </div>
                    </div>
                </section>
            )}
            {role === 'cap' && (
                <Modal
                    className="flex items-center justify-center"
                    open={isModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <FinesModal id={playerId} />
                </Modal>
            )}
        </>
    )
}

export default FinesPage
