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
    const { players, getPlayer } = usePlayers()
    const { role } = useAuth()

    const POSITIONS = ['GR', 'DE', 'DD', 'DC', 'MC', 'ME', 'MD', 'MDC', 'MOC', 'EE', 'ED', 'PL', 'SUP']
    const INITIAL_PLAYERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const BENCH_PLAYERS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const DEFAULT_BAIRRO_TACTIC = '4-4-2'

    useEffect(() => {
        setGame(getGame(id))
        console.log(getGame(id))
        console.log(game?.teams.bairro.tactic)
    }, [id, getGame, games])

    const goalsScored = game?.final_result?.split('-')[0]
    const goalsConceded = game?.final_result?.split('-')[1]
    const isDraw = goalsScored === goalsConceded

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const bairroInitialPlayers = INITIAL_PLAYERS.map((initialPosition) => {
            const _id = formData.get(`initial-bairro-player-name-${initialPosition}`)
            const position = formData.get(`initial-bairro-player-position-${initialPosition}`)
            const goalsMinutes = (formData.get(`initial-bairro-player-goals-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const yellowMinutes = (formData.get(`initial-bairro-player-yellow-${initialPosition}`) as string)
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
                yellow: yellowMinutes[0] !== '' ? yellowMinutes.map((minute) => ({ minute })) : null,
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
            const yellowMinutes = (formData.get(`bench-bairro-player-yellow-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`bench-bairro-player-red-${benchPosition}`) as string).trim().split(' ')
            const subsMinutes = (formData.get(`bench-bairro-player-subs-${benchPosition}`) as string).trim().split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowMinutes[0] !== '' ? yellowMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { _id, position, goals, cards, subs }
        })

        const opponentInitialPlayers = INITIAL_PLAYERS.map((initialPosition) => {
            const name = formData.get(`initial-opponent-player-name-${initialPosition}`)
            const position = formData.get(`initial-opponent-player-position-${initialPosition}`)
            const goalsMinutes = (formData.get(`initial-opponent-player-goals-${initialPosition}`) as string)
                .trim()
                .split(' ')
            const yellowMinutes = (formData.get(`initial-opponent-player-yellow-${initialPosition}`) as string)
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
                yellow: yellowMinutes[0] !== '' ? yellowMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { name, position, goals, cards, subs }
        })

        const opponentBenchPlayers = BENCH_PLAYERS.map((benchPosition) => {
            const name = formData.get(`bench-opponent-player-name-${benchPosition}`)
            const position = formData.get(`bench-opponent-player-position-${benchPosition}`)
            const goalsMinutes = (formData.get(`bench-opponent-player-goals-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const yellowMinutes = (formData.get(`bench-opponent-player-yellow-${benchPosition}`) as string)
                .trim()
                .split(' ')
            const redMinutes = (formData.get(`bench-opponent-player-red-${benchPosition}`) as string).trim().split(' ')
            const subsMinutes = (formData.get(`bench-opponent-player-subs-${benchPosition}`) as string)
                .trim()
                .split(' ')

            const goals = goalsMinutes[0] !== '' ? goalsMinutes.map((minute) => ({ minute })) : null

            const cards = {
                yellow: yellowMinutes[0] !== '' ? yellowMinutes.map((minute) => ({ minute })) : null,
                red: redMinutes[0] !== '' ? redMinutes.map((minute) => ({ minute })) : null,
            }

            const subs = subsMinutes[0] !== '' ? subsMinutes.map((minute) => ({ minute })) : null

            return { name, position, goals, cards, subs }
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

        const data = {
            gameId: id,
            teams,
            date: {
                date: formData.get('date'),
                start: formData.get('start'),
            },
            weather: {
                temp: formData.get('weather-temp'),
                condition: formData.get('weather-condition'),
            },
            final_result: formData.get('final_result'),
            half_time_result: formData.get('half_time_result'),
        }

        try {
            const request = await fetch('/api/games', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const response = await request.json()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                    {role === 'mister' ? (
                        <TextField
                            name={'date'}
                            type="date"
                            className="w-full"
                            variant="outlined"
                            size="small"
                            label={'Data'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.date?.date}
                        />
                    ) : (
                        <span>{game?.date?.date}</span>
                    )}
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ScheduleOutlined fontSize="inherit" /> Horário:
                    </span>
                    {role === 'mister' ? (
                        <TextField
                            name={'start'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Hora'}
                            placeholder="15:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.date?.start}
                        />
                    ) : (
                        <span>{game?.date?.start}</span>
                    )}
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassFullOutlined fontSize="inherit" /> Resultado:
                    </span>
                    {role === 'mister' ? (
                        <TextField
                            name={'final_result'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Resultado final'}
                            placeholder="0-0"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.final_result || ''}
                        />
                    ) : (
                        <span>{game?.final_result || 'Sem resultado'}</span>
                    )}
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassBottomOutlined fontSize="inherit" /> Ao intervalo:
                    </span>
                    {role === 'mister' ? (
                        <TextField
                            name={'half_time_result'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Ao intervalo'}
                            placeholder="0-0"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.half_time_result || ''}
                        />
                    ) : (
                        <span>{game?.half_time_result || 'Sem resultado'}</span>
                    )}
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span> Vermelhos:
                    </span>
                    <span>
                        {(game?.teams?.bairro?.initial
                            .map((player) => player?.cards?.red?.length || 0)
                            .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.bairro?.bench
                                .map((player) => player?.cards?.red?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.opponent?.initial
                                .map((player) => player?.cards?.red?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.opponent?.bench
                                .map((player) => player?.cards?.red?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0)}
                    </span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span> Amarelos:
                    </span>
                    <span>
                        {(game?.teams?.bairro?.initial
                            .map((player) => player?.cards?.yellow?.length || 0)
                            .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.bairro?.bench
                                .map((player) => player?.cards?.yellow?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.opponent?.initial
                                .map((player) => player?.cards?.yellow?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0) +
                            (game?.teams?.opponent?.bench
                                .map((player) => player?.cards?.yellow?.length || 0)
                                .reduce((accumulator, current) => accumulator + current, 0) || 0)}
                    </span>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ThermostatOutlined fontSize="inherit" />
                        Temperatura:
                    </span>
                    {role === 'mister' ? (
                        <TextField
                            name={'weather-temp'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Temperatura'}
                            placeholder="Cº"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.weather?.temp || ''}
                        />
                    ) : (
                        <span>{game?.weather?.temp || 'Sem dados'}</span>
                    )}
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <CloudOutlined fontSize="inherit" />
                        Estado:
                    </span>
                    {role === 'mister' ? (
                        <TextField
                            name={'weather-condition'}
                            type="text"
                            className="w-full"
                            variant="outlined"
                            size="small"
                            label={'Condições'}
                            placeholder="Sol"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={game?.weather?.condition || ''}
                        />
                    ) : (
                        <span>{game?.weather.condition || 'Sem dados'}</span>
                    )}
                </div>
            </section>
            <Divider className="!my-12" />
            {true && (
                <>
                    <section>
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                            <PeopleOutline fontSize="inherit" /> Equipas
                        </span>
                        <div className="grid md:grid-cols-1 gap-y-24 md:gap-x-8 mt-4">
                            {/* BAIRRO TEAM */}
                            <div className="flex flex-col gap-y-2">
                                <div className="px-1 mb-4 flex items-center gap-x-4">
                                    <span>Bairro Futebol Clube</span>
                                    &mdash;
                                    {role === 'mister' ? (
                                        <span>
                                            <Select
                                                key={game?.teams?.bairro.tactic}
                                                name="bairro-tactic"
                                                size="sm"
                                                defaultValue={game?.teams?.bairro.tactic}
                                            >
                                                <Option value="3-4-3">3-4-3</Option>
                                                <Option value="4-4-2">4-4-2</Option>
                                                <Option value="4-3-3">4-3-3</Option>
                                                <Option value="4-2-3-1">4-2-3-1</Option>
                                                <Option value="5-2-3">5-2-3</Option>
                                                <Option value="5-3-2">5-3-2</Option>
                                            </Select>
                                        </span>
                                    ) : (
                                        <span className="font-semibold text-base">{game?.teams?.bairro.tactic}</span>
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
                                                            key={
                                                                game?.teams?.bairro?.initial[initialPosition] &&
                                                                game?.teams?.bairro?.initial[initialPosition]?.position
                                                            }
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`initial-bairro-player-position-${initialPosition}`}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]
                                                                          ?.position
                                                                    : ''
                                                            }
                                                        >
                                                            {POSITIONS.map((position) => {
                                                                return (
                                                                    <Option
                                                                        key={`bairro-initial-player-position-${position}-${initialPosition}`}
                                                                        value={position}
                                                                    >
                                                                        {position}
                                                                    </Option>
                                                                )
                                                            })}
                                                        </Select>
                                                        <Select
                                                            key={
                                                                game?.teams?.bairro?.initial[initialPosition] &&
                                                                game?.teams?.bairro?.initial[initialPosition]?._id
                                                            }
                                                            placeholder="Nome"
                                                            className="w-full"
                                                            size="sm"
                                                            name={`initial-bairro-player-name-${initialPosition}`}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]?._id
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.bairro?.initial[initialPosition] &&
                                                                    game?.teams?.bairro?.initial[
                                                                        initialPosition
                                                                    ]?.cards?.yellow?.join(',')) ||
                                                                `bairro-initial-player-${initialPosition}-yellow-key`
                                                            }
                                                            name={`initial-bairro-player-yellow-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]
                                                                          ?.cards?.yellow &&
                                                                      game?.teams?.bairro?.initial[
                                                                          initialPosition
                                                                      ]?.cards?.yellow
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.initial[initialPosition] &&
                                                                    game?.teams?.bairro?.initial[
                                                                        initialPosition
                                                                    ]?.cards?.red?.join(',')) ||
                                                                `bairro-initial-player-${initialPosition}-red-key`
                                                            }
                                                            name={`initial-bairro-player-red-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]
                                                                          ?.cards?.red &&
                                                                      game?.teams?.bairro?.initial[
                                                                          initialPosition
                                                                      ]?.cards?.red
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.initial[initialPosition] &&
                                                                    game?.teams?.bairro?.initial[
                                                                        initialPosition
                                                                    ]?.goals?.join(',')) ||
                                                                `bairro-initial-player-${initialPosition}-goals-key`
                                                            }
                                                            name={`initial-bairro-player-goals-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]
                                                                          ?.goals &&
                                                                      game?.teams?.bairro?.initial[
                                                                          initialPosition
                                                                      ]?.goals
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.initial[initialPosition] &&
                                                                    game?.teams?.bairro?.initial[
                                                                        initialPosition
                                                                    ]?.subs?.join(',')) ||
                                                                `bairro-initial-player-${initialPosition}-subs-key`
                                                            }
                                                            name={`initial-bairro-player-subs-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.initial[initialPosition]
                                                                    ? game?.teams?.bairro?.initial[initialPosition]
                                                                          ?.subs &&
                                                                      game?.teams?.bairro?.initial[
                                                                          initialPosition
                                                                      ]?.subs
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                game?.teams?.bairro?.bench[benchPosition] &&
                                                                game?.teams?.bairro?.bench[benchPosition]?.position
                                                            }
                                                            placeholder="Posição"
                                                            className="w-[8.5rem]"
                                                            size="sm"
                                                            name={`bench-bairro-player-position-${benchPosition}`}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]
                                                                          ?.position
                                                                    : ''
                                                            }
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
                                                            key={
                                                                game?.teams?.bairro?.bench[benchPosition] &&
                                                                game?.teams?.bairro?.bench[benchPosition]?._id
                                                            }
                                                            placeholder="Nome"
                                                            className="w-full"
                                                            size="sm"
                                                            name={`bench-bairro-player-name-${benchPosition}`}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]?._id
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.bairro?.bench[benchPosition] &&
                                                                    game?.teams?.bairro?.bench[
                                                                        benchPosition
                                                                    ]?.cards?.yellow?.join(',')) ||
                                                                `bairro-bench-player-${benchPosition}-yellow-key`
                                                            }
                                                            name={`bench-bairro-player-yellow-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]?.cards
                                                                          ?.yellow &&
                                                                      game?.teams?.bairro?.bench[
                                                                          benchPosition
                                                                      ]?.cards?.yellow
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.bench[benchPosition] &&
                                                                    game?.teams?.bairro?.bench[
                                                                        benchPosition
                                                                    ]?.cards?.red?.join(',')) ||
                                                                `bairro-bench-player-${benchPosition}-red-key`
                                                            }
                                                            name={`bench-bairro-player-red-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]?.cards
                                                                          ?.red &&
                                                                      game?.teams?.bairro?.bench[
                                                                          benchPosition
                                                                      ]?.cards?.red
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.bench[benchPosition] &&
                                                                    game?.teams?.bairro?.bench[
                                                                        benchPosition
                                                                    ]?.goals?.join(',')) ||
                                                                `bairro-bench-player-${benchPosition}-goals-key`
                                                            }
                                                            name={`bench-bairro-player-goals-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]
                                                                          ?.goals &&
                                                                      game?.teams?.bairro?.bench[benchPosition]?.goals
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            key={
                                                                (game?.teams?.bairro?.bench[benchPosition] &&
                                                                    game?.teams?.bairro?.bench[
                                                                        benchPosition
                                                                    ]?.subs?.join(',')) ||
                                                                `bairro-bench-player-${benchPosition}-subs-key`
                                                            }
                                                            name={`bench-bairro-player-subs-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Entrou'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            defaultValue={
                                                                game?.teams?.bairro?.bench[benchPosition]
                                                                    ? game?.teams?.bairro?.bench[benchPosition]?.subs &&
                                                                      game?.teams?.bairro?.bench[benchPosition]?.subs
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <>
                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mb-4">
                                                Titulares
                                            </span>
                                            <ul>
                                                {game?.teams?.bairro?.initial.map((player) => {
                                                    return (
                                                        <li
                                                            key={player._id}
                                                            className="flex items-center justify-between gap-x-4 py-2 border-b border-b-slate-200 last:border-none"
                                                        >
                                                            <div className="flex items-center gap-x-4">
                                                                <span className="border border-slate-200 rounded-md w-10 text-center py-1 text-xs">
                                                                    {player.position}
                                                                </span>
                                                                <span className="flex items-center gap-x-2">
                                                                    {player._id && getPlayer(player?._id)
                                                                        ? getPlayer(player?._id).name
                                                                        : ''}
                                                                    {player?.subs?.length ? (
                                                                        <span className="text-red-600 pb-px">
                                                                            <RestartAltOutlined fontSize="inherit" />
                                                                            <span className="text-xs">
                                                                                {player.subs[0].minute}
                                                                                &apos;
                                                                            </span>
                                                                        </span>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex gap-x-8">
                                                                {player.cards && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.cards?.yellow?.length ? (
                                                                                player.cards.yellow.map((yellow) => (
                                                                                    <li
                                                                                        key={`${player._id}-${yellow.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {yellow.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                            {player?.cards?.red?.length ? (
                                                                                player.cards.red.map((red) => (
                                                                                    <li
                                                                                        key={`${player._id}-${red.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {red.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {player.goals && player.goals.length > 0 && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.goals.length ? (
                                                                                player.goals.map((goal) => (
                                                                                    <li
                                                                                        key={`${player._id}-${goal.minute}`}
                                                                                    >
                                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                                        <span className="text-xs">
                                                                                            {goal.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>

                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mt-8 mb-4">
                                                Suplentes
                                            </span>
                                            <ul>
                                                {game?.teams?.bairro?.bench.map((player, index) => {
                                                    return (
                                                        <li
                                                            key={player._id}
                                                            className="flex items-center justify-between gap-x-4 py-2 border-b border-b-slate-200 last:border-none"
                                                        >
                                                            <div className="flex items-center gap-x-4">
                                                                <span className="border border-slate-200 rounded-md w-10 text-center py-1 text-xs">
                                                                    {player.position}
                                                                </span>
                                                                <span className="flex items-center gap-x-2">
                                                                    {player._id && getPlayer(player._id)
                                                                        ? getPlayer(player._id).name
                                                                        : ''}
                                                                    {player?.subs?.length ? (
                                                                        <span className="text-green-600 pb-px">
                                                                            <RestartAltOutlined fontSize="inherit" />
                                                                            <span className="text-xs">
                                                                                {player.subs[0].minute}
                                                                                &apos;
                                                                            </span>
                                                                        </span>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex gap-x-8">
                                                                {player.cards && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.cards?.yellow?.length ? (
                                                                                player.cards.yellow.map((yellow) => (
                                                                                    <li
                                                                                        key={`${player._id}-${yellow.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {yellow.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                            {player?.cards?.red?.length ? (
                                                                                player.cards.red.map((red) => (
                                                                                    <li
                                                                                        key={`${player._id}-red-${red.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {red.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {player.goals && player.goals.length > 0 && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.goals.length ? (
                                                                                player.goals.map((goal) => (
                                                                                    <li
                                                                                        key={`${player._id}-${goal.minute}`}
                                                                                    >
                                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                                        <span className="text-xs">
                                                                                            {goal.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                    )}
                                </div>
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
                                        <span className="font-semibold text-base">{game?.teams?.opponent.tactic}</span>
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
                                                            key={
                                                                game?.teams?.opponent?.initial[initialPosition] &&
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ?.position
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.position
                                                                    : ''
                                                            }
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
                                                            key={
                                                                game?.teams?.opponent?.initial[initialPosition] &&
                                                                game?.teams?.opponent?.initial[initialPosition]?.name
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.name
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            name={`initial-opponent-player-yellow-${initialPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            key={
                                                                (game?.teams?.opponent?.initial[initialPosition] &&
                                                                    game?.teams?.opponent?.initial[
                                                                        initialPosition
                                                                    ]?.cards?.yellow?.join(',')) ||
                                                                `opponent-initial-player-${initialPosition}-yellow-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.cards?.yellow &&
                                                                      game?.teams?.opponent?.initial[
                                                                          initialPosition
                                                                      ]?.cards?.yellow
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.initial[initialPosition] &&
                                                                    game?.teams?.opponent?.initial[
                                                                        initialPosition
                                                                    ]?.cards?.red?.join(',')) ||
                                                                `opponent-initial-player-${initialPosition}-red-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.cards?.red &&
                                                                      game?.teams?.opponent?.initial[
                                                                          initialPosition
                                                                      ]?.cards?.red
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.initial[initialPosition] &&
                                                                    game?.teams?.opponent?.initial[
                                                                        initialPosition
                                                                    ]?.goals?.join(',')) ||
                                                                `opponent-initial-player-${initialPosition}-goals-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.goals &&
                                                                      game?.teams?.opponent?.initial[
                                                                          initialPosition
                                                                      ]?.goals
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.initial[initialPosition] &&
                                                                    game?.teams?.opponent?.initial[
                                                                        initialPosition
                                                                    ]?.subs?.join(',')) ||
                                                                `opponent-initial-player-${initialPosition}-subs-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.initial[initialPosition]
                                                                    ? game?.teams?.opponent?.initial[initialPosition]
                                                                          ?.subs &&
                                                                      game?.teams?.opponent?.initial[
                                                                          initialPosition
                                                                      ]?.subs
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                game?.teams?.opponent?.bench[benchPosition] &&
                                                                game?.teams?.opponent?.bench[benchPosition]?.position
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]
                                                                          ?.position
                                                                    : 'SUP'
                                                            }
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
                                                            key={
                                                                game?.teams?.opponent?.bench[benchPosition] &&
                                                                game?.teams?.opponent?.bench[benchPosition]?.name
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]?.name
                                                                    : ''
                                                            }
                                                        />
                                                        <TextField
                                                            name={`bench-opponent-player-yellow-${benchPosition}`}
                                                            type="text"
                                                            className="w-max"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            key={
                                                                (game?.teams?.opponent?.bench[benchPosition] &&
                                                                    game?.teams?.opponent?.bench[
                                                                        benchPosition
                                                                    ]?.cards?.yellow?.join(',')) ||
                                                                `opponent-bench-player-${benchPosition}-yellow-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]?.cards
                                                                          ?.yellow &&
                                                                      game?.teams?.opponent?.bench[
                                                                          benchPosition
                                                                      ]?.cards?.yellow
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.bench[benchPosition] &&
                                                                    game?.teams?.opponent?.bench[
                                                                        benchPosition
                                                                    ]?.cards?.red?.join(',')) ||
                                                                `opponent-bench-player-${benchPosition}-red-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]?.cards
                                                                          ?.red &&
                                                                      game?.teams?.opponent?.bench[
                                                                          benchPosition
                                                                      ]?.cards?.red
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.bench[benchPosition] &&
                                                                    game?.teams?.opponent?.bench[
                                                                        benchPosition
                                                                    ]?.goals?.join(',')) ||
                                                                `opponent-bench-player-${benchPosition}-goals-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]
                                                                          ?.goals &&
                                                                      game?.teams?.opponent?.bench[benchPosition]?.goals
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
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
                                                            key={
                                                                (game?.teams?.opponent?.bench[benchPosition] &&
                                                                    game?.teams?.opponent?.bench[
                                                                        benchPosition
                                                                    ]?.subs?.join(',')) ||
                                                                `opponent-bench-player-${benchPosition}-subs-key`
                                                            }
                                                            defaultValue={
                                                                game?.teams?.opponent?.bench[benchPosition]
                                                                    ? game?.teams?.opponent?.bench[benchPosition]
                                                                          ?.subs &&
                                                                      game?.teams?.opponent?.bench[benchPosition]?.subs
                                                                          .map((card) => card.minute)
                                                                          .join(' ')
                                                                    : ''
                                                            }
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <>
                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mb-4">
                                                Titulares
                                            </span>
                                            <ul>
                                                {game?.teams?.opponent?.initial.map((player) => {
                                                    return (
                                                        <li
                                                            key={player._id}
                                                            className="flex items-center justify-between gap-x-4 py-2 border-b border-b-slate-200 last:border-none"
                                                        >
                                                            <div className="flex items-center gap-x-4">
                                                                <span className="border border-slate-200 rounded-md w-10 text-center py-1 text-xs">
                                                                    {player.position || 'N/A'}
                                                                </span>
                                                                <span
                                                                    className={`${
                                                                        !player.name ? 'text-gray-400' : ''
                                                                    } flex items-center gap-x-2`}
                                                                >
                                                                    {player.name || 'Sem dados'}
                                                                    {player?.subs?.length ? (
                                                                        <span className="text-red-600 pb-px">
                                                                            <RestartAltOutlined fontSize="inherit" />
                                                                            <span className="text-xs">
                                                                                {player.subs[0].minute}
                                                                                &apos;
                                                                            </span>
                                                                        </span>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex gap-x-8">
                                                                {player.cards && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.cards?.yellow?.length ? (
                                                                                player.cards.yellow.map((yellow) => (
                                                                                    <li
                                                                                        key={`${player._id}-${yellow.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {yellow.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                            {player?.cards?.red?.length ? (
                                                                                player.cards.red.map((red) => (
                                                                                    <li
                                                                                        key={`${player._id}-${red.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {red.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {player.goals && player.goals.length > 0 && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.goals.length ? (
                                                                                player.goals.map((goal) => (
                                                                                    <li
                                                                                        key={`${player._id}-${goal.minute}`}
                                                                                    >
                                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                                        <span className="text-xs">
                                                                                            {goal.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>

                                            <span className="flex items-center gap-x-1 text-sm text-blue-500 mt-8 mb-4">
                                                Suplentes
                                            </span>
                                            <ul>
                                                {game?.teams?.opponent?.bench.map((player) => {
                                                    return (
                                                        <li
                                                            key={player._id}
                                                            className="flex items-center justify-between gap-x-4 py-2 border-b border-b-slate-200 last:border-none"
                                                        >
                                                            <div className="flex items-center gap-x-4">
                                                                <span className="border border-slate-200 rounded-md w-10 text-center py-1 text-xs">
                                                                    {player.position || 'SUP'}
                                                                </span>
                                                                <span
                                                                    className={`${
                                                                        !player.name ? 'text-gray-400' : ''
                                                                    } flex items-center gap-x-2`}
                                                                >
                                                                    {player.name || 'Sem dados'}
                                                                    {player?.subs?.length ? (
                                                                        <span className="text-green-600 pb-px">
                                                                            <RestartAltOutlined fontSize="inherit" />
                                                                            <span className="text-xs">
                                                                                {player.subs[0].minute}
                                                                                &apos;
                                                                            </span>
                                                                        </span>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex gap-x-8">
                                                                {player.cards && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.cards?.yellow?.length ? (
                                                                                player.cards.yellow.map((yellow) => (
                                                                                    <li
                                                                                        key={`${player._id}-${yellow.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {yellow.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                            {player?.cards?.red?.length ? (
                                                                                player.cards.red.map((red) => (
                                                                                    <li
                                                                                        key={`${player._id}-red-${red.minute}`}
                                                                                    >
                                                                                        {/* <SportsSoccerOutlined fontSize="inherit" /> */}
                                                                                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span>
                                                                                        <span className="text-xs">
                                                                                            {red.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {player.goals && player.goals.length > 0 && (
                                                                    <div className="flex items-center gap-x-4">
                                                                        <ul className="flex gap-x-2">
                                                                            {player?.goals.length ? (
                                                                                player.goals.map((goal) => (
                                                                                    <li
                                                                                        key={`${player._id}-${goal.minute}`}
                                                                                    >
                                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                                        <span className="text-xs">
                                                                                            {goal.minute}
                                                                                            &apos;
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>

                            {role === 'mister' && (
                                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveOutlined fontSize="small" />}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                    <Divider className="!my-12" />
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
        </form>
    )
}

export default MatchPage
