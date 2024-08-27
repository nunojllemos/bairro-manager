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
import { EditOutlined, EmojiEventsOutlined, ThumbDownAltOutlined } from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'
import PointsModal from '@/components/Modals/PointsModal'

const TablePage = () => {
    const { isAuthenticated, role } = useAuth()
    const { players } = usePlayers()
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!isAuthenticated) redirect('/login')

    const handleClose = () => setIsModalOpen(false)

    const openModal = () => setIsModalOpen(true)

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
                        vencer cada obstáculo que nos é apresentado.
                        <br />
                        <br />
                        As regras são simples:
                        <span className="block pl-2">
                            - A <strong>metade de baixo</strong> paga multa mensalmente
                        </span>
                        <span className="block pl-2">
                            - O <strong>primeiro classificado</strong> vence um prémio
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
                                    Pontos
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players
                                .sort((a, b) => b.points - a.points)
                                .map((player, index) => {
                                    return (
                                        <TableRow className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={player._id}>
                                            <TableCell size="small">
                                                <div className="flex items-center gap-x-4 capitalize">
                                                    <span>#{index + 1}</span>
                                                    <Avatar src={player.avatar} />
                                                    <span
                                                        className={`${
                                                            index + 1 > players.length / 2 ? 'text-red-500' : ''
                                                        }`}
                                                    >
                                                        {player.name}{' '}
                                                    </span>
                                                    {index + 1 > players.length / 2 && (
                                                        <span className="text-xl pl-4 text-red-500">
                                                            <ThumbDownAltOutlined fontSize="inherit" />
                                                        </span>
                                                    )}
                                                    {index === 0 && (
                                                        <span className="text-xl pl-4 text-green-700">
                                                            <EmojiEventsOutlined fontSize="inherit" />
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                {player.points}
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
                    <section className="mt-12 flex justify-end">
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
