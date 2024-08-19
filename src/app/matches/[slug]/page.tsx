import React from 'react'
import Link from 'next/link'
import {
    ArrowBackOutlined,
    BlockOutlined,
    CalendarTodayOutlined,
    CloudOutlined,
    ContentPasteOutlined,
    HourglassBottomOutlined,
    HourglassFullOutlined,
    InfoOutlined,
    PeopleOutline,
    RestartAltOutlined,
    ScheduleOutlined,
    SportsSoccerOutlined,
    ThermostatOutlined,
} from '@mui/icons-material'
import { Divider, dividerClasses, Typography } from '@mui/material'

const MatchPage = () => {
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

    const goalsScored = DUMMY_GAME.result.split('-')[0]
    const goalsConceded = DUMMY_GAME.result.split('-')[1]
    const isDraw = goalsScored === goalsConceded

    return (
        <>
            <div className="flex items-center gap-x-2 text-blue-500">
                <ArrowBackOutlined fontSize="small" />
                <Link href="/matches">Voltar</Link>
            </div>
            <div className="flex items-center gap-x-4 pl-2 mt-12 md:mt-20">
                <span
                    className={`inline-block w-4 h-4 rounded-lg ${
                        DUMMY_GAME.isWin
                            ? 'bg-green-500'
                            : isDraw
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                    }`}
                ></span>
                <span className="inline-block text-xs py-1 px-3 rounded-sm border border-slate-300">
                    {DUMMY_GAME.place.toUpperCase()}
                </span>
            </div>
            <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500 mt-4 mb-12 md:mb-24">
                <SportsSoccerOutlined fontSize="inherit" />
                <Typography
                    variant="inherit"
                    className="font-semibold leading-none"
                >
                    {DUMMY_GAME.team}
                </Typography>
            </div>
            <div className="mt-8">
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <InfoOutlined fontSize="inherit" /> Detalhes
                </span>
            </div>
            <section className="grid md:grid-cols-2 gap-x-2 lg:gap-x-24 xl:gap-x-64 gap-y-2 w-full">
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4 mt-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <CalendarTodayOutlined fontSize="inherit" /> Data:
                    </span>
                    <span>{DUMMY_GAME.date}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ScheduleOutlined fontSize="inherit" /> Horário:
                    </span>
                    <span>{DUMMY_GAME.schedule}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassFullOutlined fontSize="inherit" /> Resultado:
                    </span>
                    <span>{DUMMY_GAME.result}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <HourglassBottomOutlined fontSize="inherit" /> Ao
                        intervalo:
                    </span>
                    <span>{DUMMY_GAME.resultHalfTime}</span>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-red-500 rounded-sm mx-1"></span>{' '}
                        Vermelhos:
                    </span>
                    <span>{DUMMY_GAME.cards.red.length}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <span className="inline-block w-2 h-3 bg-yellow-500 rounded-sm mx-1"></span>{' '}
                        Amarelos:
                    </span>
                    <span>{DUMMY_GAME.cards.yellow.length}</span>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <ThermostatOutlined fontSize="inherit" />
                        Temperatura:
                    </span>
                    <span>{DUMMY_GAME.weather.temp}</span>
                </div>
                <div className="w-full grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-semibold flex items-center gap-x-2">
                        <CloudOutlined fontSize="inherit" />
                        Estado:
                    </span>
                    <span>{DUMMY_GAME.weather.status}</span>
                </div>
            </section>
            <Divider className="my-12" />
            <section>
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <PeopleOutline fontSize="inherit" /> Equipas
                </span>
                <div className="grid md:grid-cols-2 gap-y-24 md:gap-x-8 mt-4">
                    <ul className="flex flex-col gap-y-2">
                        <li className="px-1 mb-4 flex items-center gap-x-4">
                            <span>Bairro</span>
                            &mdash;
                            <span className="font-semibold text-base">
                                {DUMMY_GAME.teams.bairro.tactics}
                            </span>
                        </li>
                        {DUMMY_GAME.teams.bairro.players
                            .filter((player) => player.position !== 'sup')
                            .map((player) => {
                                return (
                                    <li
                                        key={player.name}
                                        className="flex items-center justify-between gap-x-4"
                                    >
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
                                        {player.goals &&
                                            player.goals.length > 0 && (
                                                <div className="flex items-center gap-x-4">
                                                    <ul className="flex gap-x-2">
                                                        {player?.goals &&
                                                            player.goals.map(
                                                                (goal) => (
                                                                    <li
                                                                        key={
                                                                            goal.min
                                                                        }
                                                                    >
                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                        <span className="text-xs">
                                                                            {
                                                                                goal.min
                                                                            }
                                                                            &apos;
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            )}
                                    </li>
                                )
                            })}
                        <li>
                            <Divider className="my-2" />
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
                                        {player.goals &&
                                            player.goals.length > 0 && (
                                                <div className="flex items-center gap-x-4">
                                                    <ul className="flex gap-x-2">
                                                        {player?.goals &&
                                                            player.goals.map(
                                                                (goal) => (
                                                                    <li
                                                                        key={
                                                                            goal.min
                                                                        }
                                                                    >
                                                                        <SportsSoccerOutlined fontSize="inherit" />
                                                                        <span className="text-xs">
                                                                            {
                                                                                goal.min
                                                                            }
                                                                            &apos;
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                            )}
                                    </li>
                                )
                            })}
                    </ul>
                    <ul className="flex flex-col gap-y-2">
                        <li className="px-1 mb-4 flex items-center gap-x-4">
                            <span>{DUMMY_GAME.team}</span>
                            &mdash;
                            <span className="font-semibold text-base">
                                {DUMMY_GAME.teams.other.tactics}
                            </span>
                        </li>
                        {DUMMY_GAME.teams.other.players
                            .filter((player) => player.position !== 'sup')
                            .map((player) => {
                                return (
                                    <li
                                        key={player.name}
                                        className="flex items-center gap-x-4"
                                    >
                                        <span className="border border-slate-200 rounded-md w-8 text-center py-1 text-xs">
                                            {player.position}
                                        </span>
                                        <span className={`${true}`}>
                                            {player.name}
                                        </span>
                                    </li>
                                )
                            })}
                        <li>
                            <Divider className="my-2" />
                        </li>
                        <li className="text-xs text-slate-400">Suplentes</li>
                        {DUMMY_GAME.teams.other.players.filter(
                            (player) => player.position === 'sup'
                        ).length > 0 ? (
                            DUMMY_GAME.teams.other.players
                                .filter((player) => player.position === 'sup')
                                .map((player) => {
                                    return (
                                        <li
                                            key={player.name}
                                            className="flex items-center gap-x-4 text-slate-400"
                                        >
                                            <span className="border border-slate-200 rounded-md w-8 text-center py-1 text-xs">
                                                {player.position}
                                            </span>
                                            <span className={`${true}`}>
                                                {player.name}
                                            </span>
                                        </li>
                                    )
                                })
                        ) : (
                            <div className="flex gap-x-2 items-center text-slate-400">
                                <BlockOutlined fontSize="inherit" />
                                <span>Sem dados</span>
                            </div>
                        )}
                    </ul>
                </div>
            </section>
            <Divider className="my-12" />
            <section>
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <ContentPasteOutlined fontSize="inherit" /> Pre jogo
                </span>
                <div className="mt-4 py-4 px-6 border border-slate-300 rounded-md">
                    <p className="text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Culpa, quo accusamus. Porro consequuntur ullam
                        dolorum veritatis earum neque vero quibusdam facilis ad,
                        temporibus saepe atque ipsa, nostrum enim voluptatem
                        ducimus! Culpa obcaecati incidunt veniam repellat magni
                        delectus sit numquam itaque repellendus omnis quas, fuga
                        excepturi consequuntur, accusantium ex, ipsam nostrum
                        possimus. Numquam blanditiis id quis alias! Quos non qui
                        assumenda.
                    </p>
                </div>
            </section>
            <Divider className="my-12" />
            <section>
                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                    <ContentPasteOutlined fontSize="inherit" /> Pos jogo
                </span>
                <div className="mt-4 py-4 px-6 border border-slate-300 rounded-md">
                    <p className="text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Culpa, quo accusamus. Porro consequuntur ullam
                        dolorum veritatis earum neque vero quibusdam facilis ad,
                        temporibus saepe atque ipsa, nostrum enim voluptatem
                        ducimus! Culpa obcaecati incidunt veniam repellat magni
                        delectus sit numquam itaque repellendus omnis quas, fuga
                        excepturi consequuntur, accusantium ex, ipsam nostrum
                        possimus. Numquam blanditiis id quis alias! Quos non qui
                        assumenda.
                    </p>
                </div>
            </section>
        </>
    )
}

export default MatchPage
