'use client'
import useAuth from '@/hooks/useAuth'
import { AddOutlined, PanToolAltOutlined, SportsSoccerOutlined } from '@mui/icons-material'
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const MatchesPage = () => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) redirect('/login')

    const DUMMY_GAMES = [
        {
            team: 'Ruivães',
            date: '2024-05-11',
            isWin: true,
            place: 'casa',
            result: '5-1',
        },
        {
            team: 'Delães',
            date: '2024-06-11',
            isWin: true,
            place: 'fora',
            result: '0-3',
        },
        {
            team: 'Man City',
            date: '2024-02-11',
            isWin: false,
            place: 'fora',
            result: '0-0',
        },
        {
            team: 'Barcelona',
            date: '2024-03-11',
            isWin: false,
            place: 'fora',
            result: '2-1',
        },
    ]

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
            <Divider className="!my-8" />
            <section>
                <TableContainer>
                    <Table sx={{ minWidth: 440 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold text-blue-500 w-12"></TableCell>
                                <TableCell className="font-semibold text-blue-500">Data</TableCell>
                                <TableCell className="font-semibold text-blue-500">Equipa</TableCell>
                                <TableCell align="right" className="font-semibold text-blue-500">
                                    <span className="inline-block mr-3 lg:mr-2">Resultado</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DUMMY_GAMES.map((game, index) => {
                                const goalsScored = game.result.split('-')[0]
                                const goalsConceded = game.result.split('-')[1]
                                const isDraw = goalsScored === goalsConceded

                                return (
                                    <TableRow className={`${index % 2 === 0 ? 'bg-white' : ''}`} key={game.date}>
                                        <TableCell size="small">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-block w-2 h-2 rounded ${
                                                        game.isWin
                                                            ? 'bg-green-500'
                                                            : isDraw
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                    }`}
                                                ></span>

                                                <span className="inline-block p-1 rounded-sm border border-slate-200 bg-white">
                                                    {game.place[0].toUpperCase()}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell size="small">{game.date}</TableCell>
                                        <TableCell size="small">{game.team}</TableCell>
                                        <TableCell align="right" size="small">
                                            <Link href="/matches/bairro-ruivaes">
                                                <span className="inline-block pl-2 text-blue-500">
                                                    {game.result}{' '}
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
        </>
    )
}

export default MatchesPage
