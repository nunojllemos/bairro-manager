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
import { EditOutlined, EmojiEventsOutlined } from '@mui/icons-material'
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
                        Os aniversários são mais uma chance de convivermos juntos e enaltecermos as relações e as
                        sinergias de balneário que futuramente nos trarão melhores resultados dentro do campo. Desta
                        forma, os aniversários são para serem festejados em equipa, pelo que é obrigatório levar bolo.
                    </Typography>
                </div>
            </section>
            <Divider className="!my-8" />
            <section>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold text-blue-500 pl-12">Nome</TableCell>
                                <TableCell align="right" className="font-semibold text-blue-500">
                                    Pontos
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players
                                .sort((a, b) => b.points - a.points)
                                .map((player, index) => {
                                    return (
                                        <TableRow
                                            className={`${index % 2 === 0 ? 'bg-white' : ''} ${
                                                index === 0 ? 'bg-green-100/35' : ''
                                            } ${index + 1 > players.length / 2 ? 'bg-red-100/35' : ''}`}
                                            key={player._id}
                                        >
                                            <TableCell size="small">
                                                <div className="flex items-center gap-x-4 capitalize">
                                                    <span>#{index + 1}</span>
                                                    <Avatar src={player.avatar} />
                                                    {player.name}
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
