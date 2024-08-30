'use client'
import React from 'react'
import {
    Avatar,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { CakeOutlined } from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import usePlayers from '@/hooks/usePlayers'
import { getAge } from '@/utils'

const BirthdaysPage = () => {
    const { isAuthenticated } = useAuth()
    const { players } = usePlayers()

    if (!isAuthenticated) redirect('/login')

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <CakeOutlined fontSize="inherit" />
                    <Typography variant="inherit" className="font-semibold leading-none">
                        Aniversários
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
                                <TableCell className="!font-semibold !text-blue-500">Nome</TableCell>
                                <TableCell align="right" className="!font-semibold !text-blue-500">
                                    Data
                                </TableCell>
                                <TableCell align="right" className="!font-semibold !text-blue-500">
                                    Idade
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((player, index) => {
                                    return (
                                        <TableRow className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={player._id}>
                                            <TableCell size="small">
                                                <div className="flex items-center gap-x-4 capitalize">
                                                    <Avatar src={player.avatar} />
                                                    {player.name}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                {new Date(player.dob).toLocaleDateString('pt-PT', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                })}
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                {getAge(player.dob)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </>
    )
}

export default BirthdaysPage
