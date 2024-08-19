import {
    Avatar,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { CakeOutlined, PanToolAltOutlined } from '@mui/icons-material'
import React from 'react'

const createData = (
    number: string,
    name: string,
    date: string,
    age: string,
    url: string
) => ({
    number,
    name,
    date,
    age,
    url,
})

const BirthdaysPage = async () => {
    const request = await fetch('http://localhost:3000/api/players/')
    const players = await request.json()
    console.log(players)

    const DUMMY_ROWS = [
        createData(
            '14',
            'Coruja',
            '01/10/1998',
            '27',
            'https://avatar.iran.liara.run/public/1'
        ),
        createData(
            '4',
            'Antunes',
            '02/08/1994',
            '30',
            'https://avatar.iran.liara.run/public/2'
        ),
        createData(
            '10',
            'Serra',
            '16/07/1999',
            '25',
            'https://avatar.iran.liara.run/public/3'
        ),
        createData(
            '1',
            'Cris',
            '10/06/1994',
            '31',
            'https://avatar.iran.liara.run/public/4'
        ),
        createData(
            '18',
            'Joãozinho',
            '06/08/1998',
            '27',
            'https://avatar.iran.liara.run/public/5'
        ),
    ]

    return (
        <>
            <section>
                <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                    <CakeOutlined fontSize="inherit" />
                    <Typography
                        variant="inherit"
                        className="font-semibold leading-none"
                    >
                        Aniversários
                    </Typography>
                </div>
                <div className="mt-4">
                    <Typography>
                        Os aniversários são mais uma chance de convivermos
                        juntos e enaltecermos as relações e as sinergias de
                        balneário que futuramente nos trarão melhores resultados
                        dentro do campo. Desta forma, os aniversários são para
                        serem festejados em equipa, pelo que é obrigatório levar
                        bolo.
                    </Typography>
                </div>
            </section>
            <Divider className="my-8" />
            <section>
                <TableContainer>
                    <Table sx={{ minWidth: 440 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold text-blue-500">
                                    Nome
                                </TableCell>
                                <TableCell className="font-semibold text-blue-500">
                                    Data
                                </TableCell>
                                <TableCell className="font-semibold text-blue-500">
                                    Idade
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DUMMY_ROWS.map((player, index) => {
                                return (
                                    <TableRow
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : ''
                                        }`}
                                        key={player.name}
                                    >
                                        <TableCell size="small">
                                            <div className="flex items-center gap-x-4">
                                                <Avatar src={player.url} />
                                                {player.name}
                                            </div>
                                        </TableCell>
                                        <TableCell size="small">
                                            {player.date}
                                        </TableCell>
                                        <TableCell size="small">
                                            {player.age}
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

export default BirthdaysPage
