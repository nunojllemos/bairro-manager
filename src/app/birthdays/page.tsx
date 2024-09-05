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
import usePlayers from '@/hooks/usePlayers'
import { getAge, isBirthdayCurrentMonth } from '@/utils'

const BirthdaysPage = () => {
    const { players } = usePlayers()

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
                                    console.log(player.name, isBirthdayCurrentMonth(player.dob))

                                    return (
                                        <TableRow
                                            className={`${
                                                isBirthdayCurrentMonth(player.dob)
                                                    ? 'bg-yellow-50'
                                                    : index % 2 === 0
                                                    ? 'bg-white'
                                                    : ''
                                            }`}
                                            key={player._id}
                                        >
                                            <TableCell size="small">
                                                <div className="flex items-center gap-x-4 capitalize">
                                                    <Avatar src={player.avatar} />
                                                    {player.name}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                <span
                                                    className={`text-nowrap ${
                                                        isBirthdayCurrentMonth(player.dob) ? 'font-semibold' : ''
                                                    }`}
                                                >
                                                    {new Date(player.dob).toLocaleDateString('pt-PT', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                    })}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right" size="small">
                                                <span>{getAge(player.dob)}</span>
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
