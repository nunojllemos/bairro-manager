import { Role } from '@/context/AuthContext'

export const localeStringOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
}

export const setRoleBySessionId = (sessionId: string): Role => {
    const MISTER_SECRET = process.env.NEXT_PUBLIC_MISTER_SECRET
    const CAP_SECRET = process.env.NEXT_PUBLIC_CAP_SECRET
    const PLAYER_SECRET = process.env.NEXT_PUBLIC_PLAYER_SECRET

    switch (sessionId) {
        case MISTER_SECRET:
            return 'mister'
        case CAP_SECRET:
            return 'cap'
        case PLAYER_SECRET:
            return 'player'
        default:
            return 'player'
    }
}

export const formatValuesFromFines = (values: number[]) => {}
