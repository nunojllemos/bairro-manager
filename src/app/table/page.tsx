'use client'
import React from 'react'
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
} from '@mui/material'
import { CakeOutlined, EmojiEventsOutlined, PanToolAltOutlined } from '@mui/icons-material'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

const createData = (url: string, name: string, points: number) => ({
    url,
    name,
    points,
})

const TablePage = () => {
    // const request = await fetch('http://localhost:3000/api/players/')
    // const players = await request.json()
    // console.log(players)
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) redirect('/login')

    const DUMMY_ROWS = [
        createData('https://avatar.iran.liara.run/public/1', 'Coruja', 14),
        createData('https://avatar.iran.liara.run/public/2', 'Antunes', 4),
        createData('https://avatar.iran.liara.run/public/3', 'Serra', 10),
        createData('https://avatar.iran.liara.run/public/4', 'Cris', 1),
        createData('https://avatar.iran.liara.run/public/5', 'Joãozinho', 18),
    ]

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
                    <Table sx={{ minWidth: 440 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold text-blue-500">Nome</TableCell>
                                <TableCell align="right" className="font-semibold text-blue-500">
                                    Pontos
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DUMMY_ROWS.map((player, index) => {
                                return (
                                    <TableRow className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={player.name}>
                                        <TableCell size="small">
                                            <div className="flex items-center gap-x-4">
                                                <Avatar src={player.url} />
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
                <div className="swipe-animation sm:hidden mt-4 text-zinc-500 text-2xl">
                    <PanToolAltOutlined fontSize="inherit" />
                </div>
            </section>
        </>
    )
}

export default TablePage
