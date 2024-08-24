import { Role } from '@/context/AuthContext'

export const setRoleBySessionId = (sessionId: string): Role => {
    const MISTER_SECRET = process.env.NEXT_PUBLIC_MISTER_SECRET
    const CAP_SECRET = process.env.NEXT_PUBLIC_CAP_SECRET
    const PLAYER_SECRET = process.env.NEXT_PUBLIC_PLAYER_SECRET

    console.log(sessionId)

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
