'use client'
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { Avatar, Typography } from '@mui/material'
import { EmojiEventsOutlined, EmojiPeopleOutlined, InfoOutlined } from '@mui/icons-material'
import usePlayers from '@/hooks/usePlayers'

const DashboardPage = () => {
    const { isAuthenticated, user } = useAuth()
    const { players } = usePlayers()

    if (!isAuthenticated) redirect('/login')

    // useEffect(() => {
    //     const getCoaches = async () => {
    //         const request = await fetch('/api/coaches')
    //         const response = await request.json()

    //         console.log(response)
    //     }

    //     getCoaches()
    // }, [])

    return (
        <div>
            <section className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                <EmojiPeopleOutlined fontSize="inherit" />
                <Typography variant="inherit" className="font-semibold leading-none">
                    Olá, <span className="capitalize">{user?.username}</span>
                </Typography>
<<<<<<< Updated upstream
            </div>
        </section>
=======
            </section>
            <section className="mt-12 border border-blue-200 rounded-lg p-4">
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <EmojiEventsOutlined fontSize="inherit" /> Top 5
                </span>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 bg-blue-100/30 rounded p-4 mt-4">
                    <span className="flex items-center gap-x-1 text-sm text-blue-500 col-span-2">Pontos</span>
                    <div className="px-4">
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">Mensal</span>
                        <ul className="mt-4">
                            {players
                                .sort((a, b) => b?.points?.month - a?.points?.month)
                                .filter((_, index) => index < 5)
                                .map((player, index) => (
                                    <li
                                        key={`top-${index}-month-${player._id}`}
                                        className={`${index % 2 ? '' : 'bg-blue-100/70'} py-1 px-3`}
                                    >
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                            <span className="capitalize text-center lg:text-left text-nowrap text-ellipsis w-[4.5rem] overflow-hidden">
                                                {player.name}
                                            </span>
                                            <span>{player.points.month}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">Total</span>
                        <ul className="mt-4">
                            {players
                                .sort((a, b) => b?.points?.total - a?.points?.total)
                                .filter((_, index) => index < 5)
                                .map((player, index) => (
                                    <li
                                        key={`top-${index}-month-${player._id}`}
                                        className={`${index % 2 ? '' : 'bg-blue-100/70'} py-1 px-3`}
                                    >
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                            <span className="capitalize text-center lg:text-left text-nowrap text-ellipsis w-[4.5rem] overflow-hidden">
                                                {player.name}
                                            </span>
                                            <span>{player.points.total}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 bg-blue-100/30 rounded p-4 mt-8">
                    <span className="flex items-center gap-x-1 text-sm text-blue-500 col-span-2">Cartões</span>
                    <div className="px-4">
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">Amarelos</span>
                        <ul className="mt-4">
                            {players
                                .sort((a, b) => b?.points?.month - a?.points?.month)
                                .filter((_, index) => index < 5)
                                .map((player, index) => (
                                    <li
                                        key={`top-${index}-month-${player._id}`}
                                        className={`${index % 2 ? '' : 'bg-blue-100/70'} py-1 px-3`}
                                    >
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                            <span className="capitalize text-center lg:text-left text-nowrap text-ellipsis w-[4.5rem] overflow-hidden">
                                                {player.name}
                                            </span>
                                            <span>{player.points.month}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">Vermelhos</span>
                        <ul className="mt-4">
                            {players
                                .sort((a, b) => b?.points?.total - a?.points?.total)
                                .filter((_, index) => index < 5)
                                .map((player, index) => (
                                    <li
                                        key={`top-${index}-month-${player._id}`}
                                        className={`${index % 2 ? '' : 'bg-blue-100/70'} py-1 px-3`}
                                    >
                                        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-1 lg:gap-x-4 text-xs lg:text-sm w-10 lg:w-auto">
                                            <span className="capitalize text-center lg:text-left text-nowrap text-ellipsis w-[4.5rem] overflow-hidden">
                                                {player.name}
                                            </span>
                                            <span>{player.points.total}</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
>>>>>>> Stashed changes
    )
}

export default DashboardPage
