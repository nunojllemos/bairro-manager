'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    ArrowBackOutlined,
    BlockOutlined,
    CalendarTodayOutlined,
    CloseOutlined,
    CloudOutlined,
    ContentPasteOutlined,
    HourglassBottomOutlined,
    HourglassFullOutlined,
    InfoOutlined,
    PeopleOutline,
    RestartAltOutlined,
    SaveOutlined,
    ScheduleOutlined,
    SportsSoccerOutlined,
    ThermostatOutlined,
} from '@mui/icons-material'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { Button, Divider, TextField, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import useGames from '@/hooks/useGames'
import { Game } from '@/types'
import useAuth from '@/hooks/useAuth'
import usePlayers from '@/hooks/usePlayers'

const MatchPage = () => {
    const [game, setGame] = useState<Game | null>(null)
    const pathname = usePathname()
    const id = pathname.split('/')[2]
    const { getGame, games } = useGames()
    const { players } = usePlayers()
    const { role } = useAuth()

    const POSITIONS = ['GR', 'DE', 'DD', 'DC', 'MC', 'ME', 'MD', 'MDC', 'MOC', 'EE', 'ED', 'PL', 'SUP']
    const INITIAL_PLAYERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const BENCH_PLAYERS = [12, 13, 14, 15, 16, 17, 18, 19, 20]

    useEffect(() => {
        setGame(getGame(id))
    }, [games])

    const DUMMY_GAME = {
        team: 'Ruivães',
        isWin: true,
        place: 'casa',
        result: '5-0',
        resultHalfTime: '3-0',
        date: '2024-10-07',
        schedule: '16:00',
        teams: {
            bairro: {
                tactics: '4-4-2',
                players: [
                    {
                        name: 'Cris',
                        position: 'GR',
                    },
                    {
                        name: 'Coruja',
                        position: 'LD',
                        isCaptain: true,
                    },
                    {
                        name: 'Correia',
                        position: 'DC',
                    },
                    {
                        name: 'Antunes',
                        position: 'DC',
                        sub: {
                            min: '54',
                        },
                    },
                    {
                        name: 'Joãozinho',
                        position: 'LE',
                        goals: [
                            {
                                min: '78',
                            },
                        ],
                    },
                    {
                        name: 'Costa',
                        position: 'sup',
                        sub: {
                            min: '54',
                        },
                        goals: [
                            {
                                min: '68',
                            },
                            {
                                min: '70',
                            },
                        ],
                    },
                ],
            },
            other: {
                tactics: '4-2-4',
                players: [
                    {
                        name: 'Quim',
                        position: 'GR',
                    },
                    {
                        name: 'Zé',
                        position: 'LD',
                        isCaptain: true,
                    },
                    {
                        name: 'António',
                        position: 'DC',
                    },
                    {
                        name: 'Manel',
                        position: 'DC',
                    },
                    {
                        name: 'Pedro',
                        position: 'LE',
                    },
                ],
            },
        },
        cards: {
            red: [
                {
                    name: 'John Doe',
                    time: '33',
                    isBairro: false,
                },
            ],
            yellow: [
                {
                    name: 'Serra',
                    time: '21',
                    isBairro: true,
                },
                {
                    name: 'Carlos Doe',
                    time: '44',
                    isBairro: false,
                },
                {
                    name: 'Joãozinho',
                    time: '78',
                    isBairro: true,
                },
            ],
        },
        weather: {
            temp: '24',
            status: 'Sol',
        },
    }

    const goalsScored = game?.final_result?.split('-')[0]
    const goalsConceded = game?.final_result?.split('-')[1]
    const isDraw = goalsScored === goalsConceded

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const bairroInitialPlayers = INITIAL_PLAYERS.map((initialPosition) => {
            const _id = formData.get(`initial-bairro-player-name-${initialPosition}`)
            const position = formData.get(`initial-bairro-player-position-${initialPosition}`)
            const goalsMinutes = (formData.get(`initial-bairro-player-goals-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const yellowsMinutes = (formData.get(`initial-bairro-player-yellows-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`initial-bairro-player-red-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const subsMinutes = (formData.get(`initial-bairro-player-subs-${initialPosition}`) as string)
                .trim()
                .split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowsMinutes[0] !== '' ? yellowsMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { _id, position, goals, cards, subs }
        })

        const bairroBenchPlayers = BENCH_PLAYERS.map((benchPosition) => {
            const _id = formData.get(`bench-bairro-player-name-${benchPosition}`)
            const position = formData.get(`bench-bairro-player-position-${benchPosition}`)
            const goalsMinutes = (formData.get(`bench-bairro-player-goals-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const yellowsMinutes = (formData.get(`bench-bairro-player-yellows-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`bench-bairro-player-red-${benchPosition}`) as string).trim().split(' ')
            const subsMinutes = (formData.get(`bench-bairro-player-subs-${benchPosition}`) as string).trim().split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowsMinutes[0] !== '' ? yellowsMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { _id, position, goals, cards, subs }
        })

        const opponentInitialPlayers = INITIAL_PLAYERS.map((initialPosition) => {
            const _id = formData.get(`initial-opponent-player-name-${initialPosition}`)
            const position = formData.get(`initial-opponent-player-position-${initialPosition}`)
            const goalsMinutes = (formData.get(`initial-opponent-player-goals-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const yellowsMinutes = (formData.get(`initial-opponent-player-yellows-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`initial-opponent-player-red-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const subsMinutes = (formData.get(`initial-opponent-player-subs-${initialPosition}`) as string)
                .trim()
                .split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowsMinutes[0] !== '' ? yellowsMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { _id, position, goals, cards, subs }
        })

        const opponentBenchPlayers = BENCH_PLAYERS.map((benchPosition) => {
            const _id = formData.get(`bench-opponent-player-name-${benchPosition}`)
            const position = formData.get(`bench-opponent-player-position-${benchPosition}`)
            const goalsMinutes = (formData.get(`bench-opponent-player-goals-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const yellowsMinutes = (formData.get(`bench-opponent-player-yellows-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`bench-opponent-player-red-${benchPosition}`) as string).trim().split(' ')
            const subsMinutes = (formData.get(`bench-opponent-player-subs-${benchPosition}`) as string)
                .trim()
                .split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowsMinutes[0] !== '' ? yellowsMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { _id, position, goals, cards, subs }
        })

        const bairroTactic = formData.get('bairro-tactic')
        const opponentTactic = formData.get('opponent-tactic')

        const teams = {
            bairro: {
                tactic: bairroTactic,
                initial: bairroInitialPlayers,
                bench: bairroBenchPlayers,
            },
            opponent: {
                tactic: opponentTactic,
                initial: opponentInitialPlayers,
                bench: opponentBenchPlayers,
            },
        }

        console.log(teams)
    }

    return (
        <>
            <div className="flex items-center gap-x-2 text-blue-500">
                <ArrowBackOutlined fontSize="small" />
                <Link href="/games">Voltar</Link>
            </div>
            <div className="flex items-center gap-x-4 pl-2 mt-12 md:mt-20">
                <span
                    className={`inline-block w-4 h-4 rounded-lg ${
                        game?.is_home ? 'bg-green-500' : isDraw ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                ></span>
                <span className="inline-block text-xs py-1 px-3 rounded-sm border border-slate-300">
                    {game?.is_home ? 'CASA' : 'FORA'}
                </span>
            </div>
            <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500 mt-4 mb-12 md:mb-24">
                <SportsSoccerOutlined fontSize="inherit" />
                <Typography variant="inherit" className="font-semibold leading-none">
                    {game?.opponent}
                </Typography>
            </div>
            <div className="my-8">
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <InfoOutlined fontSize="inherit" /> Detalhes
                </span>
            </div>
            <section className="grid md:grid-cols-2 gap-x-2 lg:gap-x-24 xl:gap-x-64 gap-y-2 w-full">
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <CalendarTodayOutlined fontSize="inherit" /> Data:
                    </span>
                    <span>{game?.date?.date}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ScheduleOutlined fontSize="inherit" /> Horário:
                    </span>
                    <span>{game?.date?.start}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassFullOutlined fontSize="inherit" /> Resultado:
                    </span>
                    <span>{game?.final_result || 'Sem resultado'}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassBottomOutlined fontSize="inherit" /> Ao intervalo:
                    </span>
                    <span>{game?.half_time_result || 'Sem resultado'}</span>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span> Vermelhos:
                    </span>
                    <span>{game?.cards?.red || 'Sem dados'}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span> Amarelos:
                    </span>
                    <span>{game?.cards?.yellow || 'Sem dados'}</span>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ThermostatOutlined fontSize="inherit" />
                        Temperatura:
                    </span>
                    <span>{game?.weather?.temp || 'Sem dados'}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <CloudOutlined fontSize="inherit" />
                        Estado:
                    </span>
                    <span>{game?.weather.condition || 'Sem dados'}</span>
                </div>
            </section>
            <Divider className="!my-12" />
            {true && (
                <>
                    <section>
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                            <PeopleOutline fontSize="inherit" /> Equipas
                        </span>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-y-24 md:gap-x-8 mt-4">
                            {/* BAIRRO TEAM */}
                            <div className="flex flex-col gap-y-2">
                                <div className="px-1 mb-4 flex items-center gap-x-4">
                                    <span>Bairro Futebol Clube</span>
                                    &mdash;
                                    {role === 'mister' ? (
                                        <span>
                                            <Select name="bairro-tactic" size="sm" defaultValue="5-3-2">
                                                <Option value="4-4-2">4-4-2</Option>
                                                <Option value="4-3-3">4-3-3</Option>
                                                <Option value="4-2-3-1">4-2-3-1</Option>
                                                <Option value="5-2-3">5-2-3</Option>
                                                <Option value="5-3-2">5-3-2</Option>
                                                <Option value="5-2-3">5-2-3</Option>
                                            </Select>
                                        </span>
                                    ) : (
                                        <span className="font-semibold text-base">
                                            {game?.is_home ? game?.teams?.home.tactic : game?.teams?.away.tactic}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    {role === 'mister' ? (
                                        <div className="flex flex-col gap-y-4">
                                            <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                Titulares
                                            </span>
                                            {INITIAL_PLAYERS.map((initialPosition) => {
                                                return (
                                                    <div
                                                        key={`initial-bairro-player-${initialPosition}`}
                                                        className="flex gap-x-4"
                                                    >
                                                        <Select
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`initial-bairro-player-position-${initialPosition}`}
                                                        >
                                                            {POSITIONS.map((position) => {
                                                                return (
                                                                    <Option key={position} value={position}>
                                                                        {position}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <Select
                                                            placeholder="Nome"
                                                            className="w-full"
                                                            size="sm"
                                                            name={`initial-bairro-player-name-${initialPosition}`}
                                                        >
                                                            {players.map((player) => {
                                                                return (
                                                                    <Option
                                                                        key={`initial-bairro-player-${player._id}`}
                                                                        value={player._id}
                                                                    >
                                                                        {player.name}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <TextField
                                                            name={`initial-bairro-player-yellows-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-bairro-player-red-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-bairro-player-goals-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-bairro-player-subs-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}

                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mt-12">
                                                Suplentes
                                            </span>
                                            {BENCH_PLAYERS.map((benchPosition) => {
                                                return (
                                                    <div
                                                        key={`bench-bairro-player-${benchPosition}`}
                                                        className="flex gap-x-4"
                                                    >
                                                        <Select
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`bench-bairro-player-position-${benchPosition}`}
                                                            defaultValue="SUP"
                                                        >
                                                            {POSITIONS.map((position) => {
                                                                return (
                                                                    <Option key={position} value={position}>
                                                                        {position}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <Select
                                                            placeholder="Nome"
                                                            className="w-full"
                                                            size="sm"
                                                            name={`bench-bairro-player-name-${benchPosition}`}
                                                        >
                                                            {players.map((player) => {
                                                                return (
                                                                    <Option
                                                                        key={`bench-player-id-${player._id}`}
                                                                        value={player._id}
                                                                    >
                                                                        {player.name}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <TextField
                                                            name={`bench-bairro-player-yellows-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-bairro-player-red-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-bairro-player-goals-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-bairro-player-subs-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Entrou'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <> PLAYER VIEW</>
                                    )}
                                </div>

                                {/* {DUMMY_GAME.teams.bairro.players
                                    .filter((player) => player.position !== 'sup')
                                    .map((player) => {
                                        return (
                                            <li key={player.name} className="flex items-center justify-between gap-x-4">
                                                <div className="flex items-center gap-x-4">
                                                    <span className="border border-slate-200 rounded-md w-8 text-center py-1 text-xs">
                                                        {player.position}
                                                    </span>
                                                    <span className="flex items-center gap-x-2">
                                                        {player.name}
                                                        {player?.sub && (
                                                            <span className="text-red-600">
                                                                <RestartAltOutlined fontSize="inherit" />
                                                                <span className="text-xs">
                                                                    {player.sub?.min}
                                                                    &apos;
                                                                </span>
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                {player.goals && player.goals.length > 0 && (
                                                    <div className="flex items-center gap-x-4">
                                                        <ul className="flex gap-x-2">
                                                            {player?.goals &&
                                                                player.goals.map((goal) => (
                                                                    <li key={goal.min}>
                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                        <span className="text-xs">
                                                                            {goal.min}
                                                                            &apos;
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        )
                                    })}
                                <li>
                                    <Divider className="!my-2" />
                                </li>
                                <li className="text-xs text-slate-400">Suplentes</li>
                                {DUMMY_GAME.teams.bairro.players
                                    .filter((player) => player.position === 'sup')
                                    .map((player) => {
                                        return (
                                            <li
                                                key={player.name}
                                                className="flex items-center justify-between gap-x-4 text-slate-400"
                                            >
                                                <div className="flex items-center gap-x-4">
                                                    <span className="border border-slate-200 rounded-md w-8 text-center py-1 text-xs">
                                                        {player.position}
                                                    </span>
                                                    <span className="flex items-center gap-x-2">
                                                        {player.name}
                                                        {player?.sub && (
                                                            <span className="text-green-600">
                                                                <RestartAltOutlined
                                                                    fontSize="inherit"
                                                                    className="rotate-180"
                                                                />
                                                                <span className="text-xs">
                                                                    {player.sub?.min}
                                                                    &apos;
                                                                </span>
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                {player.goals && player.goals.length > 0 && (
                                                    <div className="flex items-center gap-x-4">
                                                        <ul className="flex gap-x-2">
                                                            {player?.goals &&
                                                                player.goals.map((goal) => (
                                                                    <li key={goal.min}>
                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                        <span className="text-xs">
                                                                            {goal.min}
                                                                            &apos;
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        )
                                    })} */}
                            </div>

                            {/* OPPONENT TEAM */}
                            <div className="flex flex-col gap-y-2">
                                <div className="px-1 mb-4 flex items-center gap-x-4">
                                    <span>{game?.opponent}</span>
                                    &mdash;
                                    {role === 'mister' ? (
                                        <span>
                                            <Select name="opponent-tactic" size="sm" defaultValue="4-3-3">
                                                <Option value="4-4-2">4-4-2</Option>
                                                <Option value="4-3-3">4-3-3</Option>
                                                <Option value="4-2-3-1">4-2-3-1</Option>
                                                <Option value="5-2-3">5-2-3</Option>
                                                <Option value="5-3-2">5-3-2</Option>
                                                <Option value="5-2-3">5-2-3</Option>
                                            </Select>
                                        </span>
                                    ) : (
                                        <span className="font-semibold text-base">
                                            {game?.is_home ? game?.teams?.away.tactic : game?.teams?.home.tactic}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    {role === 'mister' ? (
                                        <div className="flex flex-col gap-y-4">
                                            <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                Titulares
                                            </span>
                                            {INITIAL_PLAYERS.map((initialPosition) => {
                                                return (
                                                    <div
                                                        key={`initial-opponent-player-${initialPosition}`}
                                                        className="flex gap-x-4"
                                                    >
                                                        <Select
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`initial-opponent-player-position-${initialPosition}`}
                                                        >
                                                            {POSITIONS.map((position) => {
                                                                return (
                                                                    <Option key={position} value={position}>
                                                                        {position}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <TextField
                                                            name={`initial-opponent-player-name-${initialPosition}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Nome'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-opponent-player-yellows-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-opponent-player-red-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-opponent-player-goals-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`initial-opponent-player-subs-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}

                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mt-12">
                                                Suplentes
                                            </span>
                                            {BENCH_PLAYERS.map((benchPosition) => {
                                                return (
                                                    <div
                                                        key={`bench-opponent-player-${benchPosition}`}
                                                        className="flex gap-x-4"
                                                    >
                                                        <Select
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`bench-opponent-player-position-${benchPosition}`}
                                                            defaultValue="SUP"
                                                        >
                                                            {POSITIONS.map((position) => {
                                                                return (
                                                                    <Option key={position} value={position}>
                                                                        {position}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <TextField
                                                            name={`bench-opponent-player-name-${benchPosition}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Nome'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-opponent-player-yellows-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-opponent-player-red-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-opponent-player-goals-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bench-opponent-player-subs-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Entrou'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <> PLAYER VIEW</>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                                <Button type="submit" variant="contained" startIcon={<SaveOutlined fontSize="small" />}>
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </section>
                    <Divider className="!my-12" />{' '}
                </>
            )}
            <section>
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <ContentPasteOutlined fontSize="inherit" /> Pre jogo
                </span>
                <div className="mt-4 py-4 px-6 border border-slate-300 rounded-md">
                    <p className="text-sm">{game?.pre_game || 'Sem notas a apresentar'}</p>
                </div>
            </section>
            <Divider className="!my-12" />
            <section>
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <ContentPasteOutlined fontSize="inherit" /> Pos jogo
                </span>
                <div className="mt-4 py-4 px-6 border border-slate-300 rounded-md">
                    <p className="text-sm">{game?.pos_game || 'Sem notas a apresentar'}</p>
                </div>
            </section>
        </>
    )
}

export default MatchPage
