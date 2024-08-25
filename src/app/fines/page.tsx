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
import { User } from '@/types'

const createData = (
    id: string,
    name: string,
    url: string,
    total: string,
    payed: string,
    debt: string
) => ({
    id,
    name,
    url,
    total,
    payed,
    debt,
})

const FinesPage = () => {
    const { isAuthenticated, role } = useAuth()
    const [userSelected, setUserSelected] = useState('')

    useEffect(() => {
        const getPlayer = async () => {
            const request = await fetch('/api/players')
            const json = await request.json()

            console.log('JSON:', json)
        }

        getPlayer()
    }, [userSelected])

    const DUMMY_ROWS = [
        createData(
            '66c9935c555a5192c1afb7e7',
            'Coruja',
            'https://avatar.iran.liara.run/public/1',
            '100',
            '80',
            '20'
        ),
        createData(
            '66c9935c555a5192c1afb7e7',
            'Serra',
            'https://avatar.iran.liara.run/public/2',
            '100',
            '5',
            '95'
        ),
    ]

    if (!isAuthenticated) redirect('/login')

    const handleEdit = (userId: string) => setUserSelected(userId)

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <SavingsOutlined fontSize="inherit" />
                    <Typography
                        variant="inherit"
                        className="font-semibold leading-none"
                    >
                        Multas
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
                <div className="flex py-6 pl-4 pr-6 lg:pl-4 lg:pr-10 justify-between text-blue-500 font-semibold">
                    <span>Nome</span>
                    <div className="flex gap-x-6">
                        <span className="block w-12 lg:w-24 text-center">
                            Total
                        </span>
                        <span className="block w-12 lg:w-24 text-center">
                            Pago
                        </span>
                        <span className="block lg:w-24 text-center">
                            Em dívida
                        </span>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-4 lg:gap-y-2">
                    {DUMMY_ROWS.map((player, index) => {
                        return (
                            <li
                                key={player.name}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : ''
                                }`}
                            >
                                <Accordion className="!m-0 !rounded-none1 !shadow-none">
                                    <AccordionSummary
                                        className="pr-2"
                                        expandIcon={<ExpandMore />}
                                    >
                                        <div>
                                            <div className="flex flex-col lg:flex-row items-center gap-y-1 lg:gap-x-4 text-xs lg:text-sm">
                                                <Avatar src={player.url} />
                                                {player.name}
                                            </div>
                                        </div>
                                        <ul className="flex gap-x-6">
                                            <li className="w-12 lg:w-24 text-center">
                                                {player.total} &euro;
                                            </li>
                                            <li className="w-12 lg:w-24 text-center text-green-700">
                                                {player.payed} &euro;
                                            </li>
                                            <li className="w-16 lg:w-24 text-center text-red-700">
                                                &minus; {player.debt} &euro;
                                            </li>
                                        </ul>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider className="mb-4" />
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                <InfoOutlined fontSize="inherit" />
                                                Detalhes
                                            </span>
                                            {role === 'cap' && (
                                                <Button
                                                    onClick={() =>
                                                        handleEdit(player.id)
                                                    }
                                                    variant="outlined"
                                                    startIcon={
                                                        <EditOutlined fontSize="small" />
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            )}
                                        </div>
                                        <ul className="mt-4 flex flex-col gap-y-1 text-sm lg:pr-6">
                                            <li className="flex justify-between py-2 border-b border-b-slate-100">
                                                <div>
                                                    <span className="font-semibold">
                                                        Cartão vermelho:
                                                    </span>
                                                    <span className="inline-block px-2">
                                                        1
                                                    </span>
                                                </div>
                                                <div className="w-16 lg:w-24 text-center">
                                                    &minus; 15 &euro;
                                                </div>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-b-slate-100">
                                                <div>
                                                    <span className="font-semibold">
                                                        Atraso ao treino:
                                                    </span>
                                                    <span className="inline-block px-2">
                                                        3
                                                    </span>
                                                </div>
                                                <div className="w-16 lg:w-24 text-center">
                                                    &minus; 10 &euro;
                                                </div>
                                            </li>
                                            <li className="flex justify-between py-2 border-b border-b-slate-100">
                                                <div>
                                                    <span className="font-semibold">
                                                        Atraso ao jogo:
                                                    </span>
                                                    <span className="inline-block px-2">
                                                        2
                                                    </span>
                                                </div>
                                                <div className="w-16 lg:w-24 text-center">
                                                    &minus; 20 &euro;
                                                </div>
                                            </li>
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
                    <div className="flex flex-col md:flex-row md:justify-between gap-y-8">
                        <div className="flex gap-x-4 text-green-600">
                            <Typography variant="h6">
                                <TrendingUpOutlined fontSize="inherit" /> Em
                                caixa
                            </Typography>
                            <Typography variant="h6">200,00€</Typography>
                        </div>
                        <div className="flex gap-x-4 text-red-500">
                            <Typography variant="h6">
                                <TrendingDownOutlined fontSize="inherit" /> Em
                                dívida
                            </Typography>
                            <Typography variant="h6">300,00€</Typography>
                        </div>
                    </div>
                </section>
            )}
            {role === 'cap' && (
                <Modal
                    className="flex items-center justify-center"
                    open={false}
                    onClose={() => {
                        console.log('close')
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="bg-slate-100 p-8 w-max h-max rounded-md">
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        ></Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                        </Typography>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default FinesPage
