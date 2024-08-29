'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Divider,
    InputAdornment,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import {
    EditOutlined,
    ExpandMore,
    InfoOutlined,
    Inventory2Outlined,
    SavingsOutlined,
    SearchOutlined,
    TrendingDownOutlined,
    TrendingUpOutlined,
} from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect, useRouter } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'
import useFines from '@/hooks/useFines'
import FinesModal from '@/components/Modals/FinesModal'
import { localeStringOptions } from '@/utils'

const FinesPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [playerId, setPlayerId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAuthenticated, role } = useAuth()
    const { players, setPlayers } = usePlayers()
    const { fines, totalPaid, totalDebt, totalValue } = useFines()

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

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        setSearchValue(value)
    }

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
            <Divider className="!mt-8" />

            <section>
                <div className="sticky top-24 bg-slate-100 z-[2]">
                    <div className="pb-12 lg:pb-6 pt-8">
                        <TextField
                            className="w-full"
                            size="small"
                            value={searchValue}
                            placeholder="Pesquisar"
                            onChange={handleSearchInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment className="pl-4 opacity-40" position="start">
                                        <SearchOutlined fontSize="medium" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="flex py-6 pl-4 pr-6 lg:pl-4 lg:pr-10 justify-between text-blue-500 font-semibold">
                        <span>Nome</span>
                        <div className="flex gap-x-6">
                            <span className="block w-12 lg:w-24 text-center">Total</span>
                            <span className="block w-12 lg:w-24 text-center">Pago</span>
                            <span className="block lg:w-24 text-center">Em dívida</span>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-4 lg:gap-y-2">
                    {players &&
                    players.filter((player) => player.name.toLowerCase().startsWith(searchValue.toLowerCase())).length >
                        0 ? (
                        players
                            .filter((player) => player.name.toLowerCase().startsWith(searchValue.toLowerCase()))
                            .map((player, index) => {
                                return (
                                    <li key={player.name} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                                        <Accordion className="!m-0 !rounded-none1 !shadow-none">
                                            <AccordionSummary className="pr-2" expandIcon={<ExpandMore />}>
                                                <div>
                                                    <div className="flex flex-col lg:flex-row items-center gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                                        <Avatar
                                                            src={
                                                                player.avatar ||
                                                                'https://i.postimg.cc/Jhzs04Fm/default.png'
                                                            }
                                                        />
                                                        <span className="capitalize text-center lg:text-left">
                                                            {player.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ul className="flex gap-x-6">
                                                    <li className="w-12 lg:w-24 text-center">
                                                        {player.fines.total} &euro;
                                                    </li>
                                                    <li className="w-12 lg:w-24 text-center">
                                                        {player.fines.paid} &euro;
                                                    </li>
                                                    <li className="w-16 lg:w-24 text-center text-red-700">
                                                        {player.fines.total - player.fines.paid > 0 ? (
                                                            <span>
                                                                &minus; {player.fines.total - player.fines.paid} &euro;
                                                            </span>
                                                        ) : (
                                                            <span className="text-green-700">
                                                                &#43; {(player.fines.total - player.fines.paid) * -1}{' '}
                                                                &euro;
                                                            </span>
                                                        )}
                                                    </li>
                                                </ul>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Divider className="!mb-8 md:!mb-4" />
                                                <div className="flex items-center justify-between lg:px-6">
                                                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                        <InfoOutlined fontSize="inherit" />
                                                        Detalhes
                                                    </span>
                                                    {role === 'cap' && (
                                                        <Button
                                                            onClick={() => {
                                                                setIsModalOpen(true)
                                                                handleEdit(player._id)
                                                            }}
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={<EditOutlined fontSize="small" />}
                                                        >
                                                            Editar
                                                        </Button>
                                                    )}
                                                </div>
                                                <ul className="mt-8 md:mt-4 flex flex-col gap-y-1 text-sm lg:px-6">
                                                    {fines &&
                                                        fines.map((fine) => {
                                                            return !Object.keys(fine).includes('values') ? (
                                                                <li
                                                                    key={fine._id}
                                                                    className="flex justify-between py-2 border-b border-b-slate-100"
                                                                >
                                                                    <div>
                                                                        <span className="font-semibold">
                                                                            {fine.name}
                                                                        </span>
                                                                        <span className="inline-block px-2">
                                                                            {player.fines.details
                                                                                .filter(
                                                                                    (detailedFine) =>
                                                                                        detailedFine._id === fine._id
                                                                                )
                                                                                .map((value) => value)[0]?.value || 0}
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-16 lg:w-24 text-center">
                                                                        {(
                                                                            player.fines.details
                                                                                .filter(
                                                                                    (detailedFine) =>
                                                                                        detailedFine._id === fine._id
                                                                                )
                                                                                .map((value) => value)[0]?.value *
                                                                                (fine?.value || 1) || 0
                                                                        ).toLocaleString(
                                                                            'pt-PT',
                                                                            localeStringOptions
                                                                        )}{' '}
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
                                                                        {/* {player.fines.total} &euro; */}
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                </ul>
                                            </AccordionDetails>
                                        </Accordion>
                                    </li>
                                )
                            })
                    ) : (
                        <li className="py-8 flex items-center justify-center gap-x-2 text-sm lg:text-lg bg-slate-200 rounded-md">
                            <Inventory2Outlined fontSize="small" /> Sem resultados para a pesquisa &quot;{searchValue}
                            &quot;
                        </li>
                    )}
                </ul>
            </section>
            {role === 'cap' && (
                <section className="mt-8">
                    <div className="flex justify-between gap-y-8">
                        <div className="flex items-center gap-x-1 text-green-600">
                            <TrendingUpOutlined fontSize="inherit" />
                            <Typography>{totalPaid?.toLocaleString('pt-PT', localeStringOptions)} &euro;</Typography>
                            <Typography className="text-slate-400">/</Typography>
                            <Typography>{totalValue?.toLocaleString('pt-PT', localeStringOptions)} &euro;</Typography>
                        </div>
                        <div className="flex items-center gap-x-2 text-red-500">
                            <TrendingDownOutlined fontSize="inherit" />
                            <Typography>{totalDebt?.toLocaleString('pt-PT', localeStringOptions)} &euro;</Typography>
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
                    <FinesModal id={playerId} handleClose={handleClose} />
                </Modal>
            )}
        </>
    )
}

export default FinesPage
