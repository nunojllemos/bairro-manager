'use client'
import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Modal,
} from '@mui/material'
import {
    CloseOutlined,
    DoneOutlined,
    EditOutlined,
    EmojiEventsOutlined,
    RestoreOutlined,
    ThumbDownAltOutlined,
} from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'
import PointsModal from '@/components/Modals/PointsModal'

const TablePage = () => {
    const [sorting, setSorting] = useState<'month' | 'total'>('month')
    const { isAuthenticated, role } = useAuth()
    const { players, setPlayers } = usePlayers()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

    if (!isAuthenticated) redirect('/login')

    const handleClose = () => setIsModalOpen(false)

    const openModal = () => setIsModalOpen(true)

    const handleReset = async () => {
        try {
            const response = await fetch('api/players/points/restart')
            const json = await response.json()
            const { players: updatedPlayers } = await json

            setPlayers(updatedPlayers)

            setIsConfirmationModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <EmojiEventsOutlined fontSize="inherit" />
                    <Typography variant="inherit" className="font-semibold leading-none">
                        Tabela
                    </Typography>
                </div>
                <div className="mt-4">
                    <Typography>
                        Cada exercício é uma nova oportunidade de ser melhor. O querer ser melhor é contagiante e vai
                        ajudar imenso cada um nos seus objetivos pessoais, e acima de tudo, a equipa a ser mais forte e
                        competente. Esta competição interna existe para alimentar essa fome de querer ser melhor e
                        vencer cada obstáculo que nos é apresentado. Há duas tabelas de forma a dar oportunidade a todos
                        de começarem de novo a cada mês.
                        <br />
                        <br />
                        As regras são simples:
                        <span className="block pl-2">
                            - A <strong>metade de baixo</strong> paga multa física mensalmente
                        </span>
                        <span className="block pl-2">
                            - O <strong>primeiro classificado</strong> vence um prémio
                        </span>
                        <span className="block pl-2">
                            - O <strong>primeiro classificado</strong> de <strong>inverno</strong> (em dezembro) e no{' '}
                            <strong>final da época</strong> vence um prémio oferecido pelos restantes companheiros
                        </span>
                    </Typography>
                </div>
            </section>
            <Divider className="!my-8" />
            <section>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="!font-semibold !text-blue-500 !pl-12">Nome</TableCell>
                                <TableCell align="right" className="!font-semibold !text-blue-500">
                                    <Button variant="text" onClick={() => setSorting('month')}>
                                        <DoneOutlined
                                            className={`${sorting === 'month' ? 'opacity-100' : 'opacity-0'}`}
                                            fontSize="inherit"
                                        />
                                        <span className="ml-2">Mês</span>
                                    </Button>
                                </TableCell>
                                <TableCell align="right" className="!font-semibold !text-blue-500">
                                    <Button variant="text" onClick={() => setSorting('total')}>
                                        <DoneOutlined
                                            className={`${sorting === 'total' ? 'opacity-100' : 'opacity-0'}`}
                                            fontSize="inherit"
                                        />
                                        <span className="ml-2">Total</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players
                                .sort((a, b) => b?.points?.[sorting] - a?.points?.[sorting])
                                .map((player, index) => {
                                    return (
                                        <TableRow className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={player._id}>
                                            <TableCell size="small">
                                                <div className="flex items-center gap-x-4 capitalize">
                                                    <span className="w-6">#{index + 1}</span>
                                                    <Avatar src={player.avatar} />
                                                    {index + 1 > players.length / 2 && (
                                                        <span className="text-xl pr-2 text-red-500">
                                                            <ThumbDownAltOutlined fontSize="inherit" />
                                                        </span>
                                                    )}
                                                    {index === 0 && (
                                                        <span className="text-xl pr-2 text-green-700">
                                                            <EmojiEventsOutlined fontSize="inherit" />
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`${
                                                            index + 1 > players.length / 2 ? 'text-red-500' : ''
                                                        }`}
                                                    >
                                                        {player.name}{' '}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                {player.points.month}
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                {player.points.total}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            {role === 'mister' && (
                <>
                    <section className="mt-12 flex flex-col lg:flex-row justify-end gap-4">
                        <Button
                            onClick={() => setIsConfirmationModalOpen(true)}
                            type="button"
                            color="error"
                            variant="outlined"
                            startIcon={<RestoreOutlined fontSize="small" />}
                        >
                            restart pontuação mensal
                        </Button>
                        <Button
                            onClick={openModal}
                            type="button"
                            variant="contained"
                            startIcon={<EditOutlined fontSize="small" />}
                        >
                            Editar
                        </Button>
                    </section>
                    <Modal
                        className="flex items-center justify-center"
                        open={isConfirmationModalOpen}
                        onClose={() => setIsConfirmationModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[40rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <Typography className="text-blue-500" fontSize={22}>
                                Tem a certeza de que quer reiniciar a pontuação mensal?
                            </Typography>
                            <Typography className="mt-2" fontSize={16}>
                                Esta ação irá zerar <strong>todas</strong> as pontuações de <strong>todos</strong> os
                                atletas e é uma ação <strong>IRREVERSÍVEL</strong>.
                            </Typography>
                            <div className="flex flex-col lg:flex-row justify-end gap-4 mt-16">
                                <Button
                                    onClick={() => setIsConfirmationModalOpen(false)}
                                    type="button"
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CloseOutlined fontSize="small" />}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleReset}
                                    type="button"
                                    variant="contained"
                                    startIcon={<RestoreOutlined fontSize="small" />}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        className="flex items-center justify-center"
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <PointsModal handleClose={handleClose} />
                    </Modal>
                </>
            )}
        </>
    )
}

export default TablePage
