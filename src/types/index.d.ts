import { Role } from '@/context/AuthContext'

type CoachRole = 'main' | 'assistant' | 'goalkeepers'

export interface User {
    username: string
    role: Role
    password: string
    session_id: string
}

interface FinesDetails {
    _id: string
    value: number
}
interface Fines {
    details: FinesDetails[]
    paid: number
    total: number
}

export interface Coach {
    name: string
    dob: string
    avatar: string
    role: CoachRole
    fines: Fines
}

type Positions = 'GR' | 'DD' | 'DC' | 'DE' | 'M' | 'MDC' | 'MD' | 'ME' | 'MOC' | 'EE' | 'ED' | 'PL'

interface Cards {
    yellow: number
    red: number
}

export interface Player {
    _id: string
    assists: number
    avatar: string
    cards: Cards
    dob: string
    fines: Fines
    goals: number
    is_captain: boolean
    name: string
    number: string
    points: {
        month: number
        total: number
    }
    positions: Positions[]
}

export interface FinesModel {
    _id: string
    name: string
    description: string
    value?: number
    values?: number[]
}

export interface Coach {
    _id: string
    name: string
    role: string
    dob: string
    avatar: string
    fines: Fines
}

type WeatherConditions = 'sunny' | 'cloudy' | 'rainy' | 'storm' | 'snow' | 'foggy'

interface PlayerGameInfo {
    _id: string
    position: string
    goals: [
        {
            minute: number
        }
    ]
    cards: {
        yellow: [
            {
                minute: number
            }
        ]
        red: [
            {
                minute: number
            }
        ]
    }
}

interface Team {
    tactic: string
    initial: PlayerGameInfo[]
    bench: PlayerGameInfo[]
}

export interface Game {
    _id: string
    opponent: string
    date: {
        date: string
        start: string
    }
    is_home: boolean
    final_result: string
    half_time_result: string
    cards: {
        yellow: number
        red: number
    }
    weather: {
        temp: string
        condition: WeatherConditions
    }
    teams: {
        home: Team
        away: Team
    }
    pre_game: string
    pos_game: string
}
