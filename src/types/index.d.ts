import { Role } from '@/context/AuthContext'

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

type Positions =
    | 'GR'
    | 'DD'
    | 'DC'
    | 'DE'
    | 'M'
    | 'MDC'
    | 'MD'
    | 'ME'
    | 'MOC'
    | 'EE'
    | 'ED'
    | 'PL'

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
    points: number
    positions: Positions[]
}

export interface FinesModel {
    _id: string
    name: string
    description: string
    value?: number
    values?: number[]
}