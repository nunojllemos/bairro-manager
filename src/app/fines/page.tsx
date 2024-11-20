'use client'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
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
import usePlayers from '@/hooks/usePlayers'
import useFines from '@/hooks/useFines'
import FinesModal from '@/components/Modals/FinesModal'
import { localeStringOptions } from '@/utils'
import useCoaches from '@/hooks/useCoaches'
import Toast from '@/components/Toast'

const FinesPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [playerId, setPlayerId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { role } = useAuth()
    const { players, loadingPlayers } = usePlayers()
    const { coaches } = useCoaches()
    const { fines, totalPaid, totalDebt, totalValue, totalDefeats, totalVictories } = useFines()

    const handleClose = () => setIsModalOpen(false)

    const handleEdit = (userId: string) => setPlayerId(userId)

    const totalFinesFromResults = useMemo(() => {
        return coaches.length * (totalVictories || 0) + players.length * (totalDefeats || 0)
    }, [coaches, players, totalDefeats, totalVictories])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        setSearchValue(value)
    }

    const calcTotalDebtValue = useMemo(() => {
        return (totalFinesFromResults + (totalDebt || 0) - (totalPaid || 0)).toLocaleString(
            'pt-PT',
            localeStringOptions
        )
    }, [totalDebt, totalPaid, totalFinesFromResults])

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
                        As multas têm como principal propósito fomentar o compromisso de cada um com a equipa e com os
                        comportamentos que todos acham adequados para o plantel. Também servem para fazer uma festa do
                        car****o no final do ano mas isso é outra história.
                        <br />
                        <br />
                        Como aprovado por <strong>todos</strong>, aqui está a tabela de preços para refrescar a memória
                        aos mais esquecidos:
                        <br />
                        <br />
                        <ul className="border border-zinc-300 grid md:grid-cols-2 gap-px bg-zinc-300 md:max-w-max">
                            <li className="bg-slate-100 px-4 py-1">Atraso ao treino</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">1,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Atraso à convocatória</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">2,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Falta injustificada ao treino</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">2,50€</li>
                            <li className="bg-slate-100 px-4 py-1">Falta injustificada ao jogo</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">10,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Telemóvel com som na palestra</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">1,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Expulsão desnecessária</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">10,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Roupa virada ou fora dos cestos</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">0,50€ / todos</li>
                            <li className="bg-slate-100 px-4 py-1">Falta de bolo de aniversário</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">30,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Falta de presença no lanche do jogo</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">2,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Falta de presença no autocarro (ida e volta)</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">2,50€</li>
                            <li className="bg-slate-100 px-4 py-1">Derrota (p/ os jogadores)</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">1,00€ / 1,50€ / 2,00€</li>
                            <li className="bg-slate-100 px-4 py-1">Vitória (p/ a equipa técnica)</li>
                            <li className="bg-slate-100 px-4 py-1 md:text-end font-semibold">1,50€ / 2,00€ / 2,50€</li>
                        </ul>
                    </Typography>
                </div>
            </section>
            <Divider className="!mt-8" />

            <section>
                <div className="sticky top-24 bg-slate-100 z-[2]">
                    <div className="pb-8 lg:pb-6 pt-8">
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
                            <span className="block w-16 lg:w-24 text-center">Total</span>
                            <span className="block w-16 lg:w-24 text-center">Pago</span>
                            <span className="block w-16 lg:w-24 text-center">Saldo</span>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-4 lg:gap-y-2">
                    {loadingPlayers && <li className="bg-white">Carregando...</li>}
                    {!loadingPlayers &&
                    players &&
                    coaches &&
                    [...players, ...coaches].filter((player) =>
                        player.name.toLowerCase().startsWith(searchValue.toLowerCase())
                    ).length > 0 ? (
                        [...players, ...coaches]
                            .filter((person) => person.name.toLowerCase().startsWith(searchValue.toLowerCase()))
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((person, index) => {
                                const isCoach = Object.keys(person).includes('role')
                                const totalFines =
                                    Number(person.fines.total) + ((isCoach ? totalVictories : totalDefeats) || 0)

                                return (
                                    <li key={person.name} className={`${index % 2 === 0 ? 'bg-white' : ''}`}>
                                        <Accordion className="!m-0 !rounded-none1 !shadow-none">
                                            <AccordionSummary className="pr-2" expandIcon={<ExpandMore />}>
                                                <div>
                                                    <div className="flex flex-col lg:flex-row items-center gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                                        <Avatar src={person.avatar} />
                                                        <span className="capitalize text-center lg:text-left text-nowrap text-ellipsis w-[4.5rem] overflow-hidden">
                                                            {person.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ul className="flex gap-x-6">
                                                    <li className="w-12 lg:w-24 text-center text-sm text-nowrap lg:text-base">
                                                        {/* {person.fines.total.toLocaleString(
                                                            'pt-PT',
                                                            localeStringOptions
                                                        )}{' '} */}
                                                        {totalFines.toLocaleString('pt-PT', localeStringOptions)} &euro;
                                                    </li>
                                                    <li className="w-12 lg:w-24 text-center text-sm text-nowrap lg:text-base">
                                                        {person.fines.paid.toLocaleString('pt-PT', localeStringOptions)}{' '}
                                                        &euro;
                                                    </li>
                                                    <li className="w-16 lg:w-24 text-center text-sm text-nowrap lg:text-base">
                                                        {totalFines - person.fines.paid === 0 ? (
                                                            <span className="text-zinc-900">
                                                                {(totalFines - person.fines.paid).toLocaleString(
                                                                    'pt-PT',
                                                                    localeStringOptions
                                                                )}{' '}
                                                                &euro;
                                                            </span>
                                                        ) : totalFines - person.fines.paid > 0 ? (
                                                            <span className="text-red-700">
                                                                &minus;{' '}
                                                                {(totalFines - person.fines.paid).toLocaleString(
                                                                    'pt-PT',
                                                                    localeStringOptions
                                                                )}{' '}
                                                                &euro;
                                                            </span>
                                                        ) : (
                                                            <span className="text-green-700">
                                                                &#43;{' '}
                                                                {((totalFines - person.fines.paid) * -1).toLocaleString(
                                                                    'pt-PT',
                                                                    localeStringOptions
                                                                )}{' '}
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
                                                                handleEdit(person._id)
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
                                                            if (
                                                                !fine.name.includes('Derrota') &&
                                                                !fine.name.includes('Vitória')
                                                            ) {
                                                                return (
                                                                    <li
                                                                        key={fine._id}
                                                                        className="flex justify-between py-2 border-b border-b-slate-100"
                                                                    >
                                                                        <div>
                                                                            <span className="font-semibold">
                                                                                {fine.name}
                                                                            </span>
                                                                            <span className="inline-block px-2">
                                                                                {person.fines.details
                                                                                    .filter(
                                                                                        (detailedFine) =>
                                                                                            detailedFine._id ===
                                                                                            fine._id
                                                                                    )
                                                                                    .map((value) => value)[0]?.value ||
                                                                                    0}
                                                                            </span>
                                                                        </div>
                                                                        <div className="w-16 lg:w-24 text-center">
                                                                            {(
                                                                                person.fines.details
                                                                                    .filter(
                                                                                        (detailedFine) =>
                                                                                            detailedFine._id ===
                                                                                            fine._id
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
                                                                )
                                                            }

                                                            if (isCoach && !fine.name.includes('Derrota')) {
                                                                return (
                                                                    <li
                                                                        key={fine._id}
                                                                        className={`flex justify-between py-2 border-b border-b-slate-100`}
                                                                    >
                                                                        <span className="font-semibold">
                                                                            {fine.name}
                                                                        </span>
                                                                        <div className="w-16 lg:w-24 text-center">
                                                                            {totalVictories?.toLocaleString(
                                                                                'pt-PT',
                                                                                localeStringOptions
                                                                            )}{' '}
                                                                            &euro;
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }

                                                            if (!isCoach && !fine.name.includes('Vitória')) {
                                                                return (
                                                                    <li
                                                                        key={fine._id}
                                                                        className={`flex justify-between py-2 border-b border-b-slate-100`}
                                                                    >
                                                                        <span className="font-semibold">
                                                                            {fine.name}
                                                                        </span>
                                                                        <div className="w-16 lg:w-24 text-center">
                                                                            {totalDefeats?.toLocaleString(
                                                                                'pt-PT',
                                                                                localeStringOptions
                                                                            )}{' '}
                                                                            &euro;
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                        })}
                                                </ul>
                                            </AccordionDetails>
                                        </Accordion>
                                    </li>
                                )
                            })
                    ) : (
                        <li className="py-8 flex items-center justify-center gap-x-2 text-sm lg:text-lg bg-slate-200 rounded-md">
                            <Inventory2Outlined fontSize="small" /> Sem resultados
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
                            <Typography>
                                {(totalFinesFromResults + (totalDebt || 0)).toLocaleString(
                                    'pt-PT',
                                    localeStringOptions
                                )}{' '}
                                &euro;
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2 text-red-500">
                            <TrendingDownOutlined fontSize="inherit" />
                            <Typography>
                                {calcTotalDebtValue}
                                &euro;
                            </Typography>
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
