'use client'
import React, { useState } from 'react'
import {
    AddOutlined,
    EditOutlined,
    InfoOutlined,
    Inventory2Outlined,
    PanToolAltOutlined,
    SportsSoccerOutlined,
} from '@mui/icons-material'
import {
    Button,
    Divider,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import useGames from '@/hooks/useGames'
import { getGameStatusByResult } from '@/utils'
import useAuth from '@/hooks/useAuth'
import GamesModal from '@/components/Modals/GamesModal'

const MatchesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const { games, gamesResultRegistry } = useGames()
    const { role } = useAuth()

    const handleClose = () => setIsModalOpen(false)

    const openModal = () => setIsModalOpen(true)

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <SportsSoccerOutlined fontSize="inherit" />
                    <Typography variant="inherit" className="font-semibold leading-none">
                        Jogos
                    </Typography>
                </div>
                <div className="mt-4">
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi et consequatur aperiam, alias
                        repellat totam! Iure quisquam, sequi possimus nesciunt explicabo reiciendis sunt distinctio,
                        maiores recusandae repellat libero ut hic.
                    </Typography>
                </div>
            </section>
            {games.length > 0 && (
                <>
                    <Divider className="!my-8" />
                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                        <InfoOutlined fontSize="inherit" />
                        Registo
                    </span>
                    <ul className="mt-8 flex items-center gap-x-2">
                        {gamesResultRegistry.map((result, index) => {
                            const isVictory = result === 'V'
                            const isDraw = result === 'E'
                            const isDefeat = result === 'D'

                            return (
                                <li key={`${index}-${result}`}>
                                    <span
                                        className={`inline-block p-1 rounded-sm border bg-white text-center ${
                                            isVictory
                                                ? 'border-green-800/30 bg-green-50 text-green-700 w-6'
                                                : isDraw
                                                ? 'border-yellow-400 bg-yellow-50 text-yellow-700 w-6'
                                                : isDefeat
                                                ? 'border-red-500 bg-red-50 text-red-700 w-6'
                                                : 'border-zinc-500 bg-zinc-50 text-zinc-700 w-12'
                                        }`}
                                    >
                                        {result}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
            <Divider className="!my-8" />
            {games.length > 0 && (
                <section>
                    <TableContainer>
                        <Table sx={{ minWidth: 440 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="!font-semibold !text-blue-500 w-12"></TableCell>
                                    <TableCell className="!font-semibold !text-blue-500">Data</TableCell>
                                    <TableCell className="!font-semibold !text-blue-500">Equipa</TableCell>
                                    <TableCell align="right" className="!font-semibold !text-blue-500">
                                        <span className="inline-block mr-3 lg:mr-2">Resultado</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {games.map((game, index) => {
                                    return (
                                        <TableRow
                                            className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                                            key={game.date.date}
                                        >
                                            <TableCell size="small">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`inline-block w-2 h-2 rounded ${
                                                            getGameStatusByResult(game.final_result, game.is_home)
                                                                .isVictory
                                                                ? 'bg-green-500'
                                                                : getGameStatusByResult(game.final_result, game.is_home)
                                                                      .isDraw
                                                                ? 'bg-yellow-500'
                                                                : getGameStatusByResult(game.final_result, game.is_home)
                                                                      .isLoss
                                                                ? 'bg-red-500'
                                                                : 'bg-zinc-300'
                                                        }`}
                                                    ></span>

                                                    <span className="inline-block p-1 rounded-sm border border-slate-200 bg-white">
                                                        {game.is_home ? 'C' : 'F'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell size="small">{game.date.date}</TableCell>
                                            <TableCell size="small">{game.opponent}</TableCell>
                                            <TableCell align="right" size="small">
                                                <Link href={`/games/${game._id}`}>
                                                    <span className="inline-block pl-2 text-blue-500">
                                                        {game.final_result}{' '}
                                                        <span className="inline-block text-xs text-blue-400 ml-1">
                                                            <AddOutlined fontSize="inherit" />
                                                            Ver mais
                                                        </span>
                                                    </span>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="swipe-animation sm:hidden mt-4 text-zinc-500 text-2xl">
                        <PanToolAltOutlined fontSize="inherit" />
                    </div>
                </section>
            )}
            {games.length <= 0 && (
                <section className="py-8 flex items-center justify-center gap-x-2 text-sm lg:text-lg bg-slate-200 rounded-md">
                    <Inventory2Outlined fontSize="small" /> Sem resultados
                </section>
            )}

            {role === 'mister' && (
                <>
                    <section className="mt-12 flex justify-end">
                        <Button
                            onClick={openModal}
                            type="button"
                            variant="contained"
                            startIcon={<AddOutlined fontSize="small" />}
                        >
                            Adicionar
                        </Button>
                    </section>
                    <Modal
                        className="flex items-center justify-center"
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <GamesModal />
                    </Modal>
                </>
            )}
        </>
    )
}

export default MatchesPage
