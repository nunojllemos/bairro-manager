import { Role } from '@/context/AuthContext'
import { Event } from '@/models/events'

export const localeStringOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
}

export const OPTIONS = {
    other: {
        color: '#475569',
        emoji: '🍾',
    },
    game: {
        color: '#16a34a',
        emoji: '🏆️',
    },
    session: {
        color: '#60a5fa',
        emoji: '⚽️',
    },
    anniversary: {
        color: '#facc15',
        emoji: '🎂',
    },
}

export const EVENT_TYPES = Object.keys(OPTIONS)

export const mapEventsToPortuguese = () => {
    const eventsTranslated = EVENT_TYPES.map((event) => {
        switch (event) {
            case 'other':
                return '🍾 Outros'
            case 'game':
                return '🏆️ Jogo'
            case 'session':
                return '⚽️ Treino'
            case 'anniversary':
                return '🎂 Aniversário'
        }
    })

    return eventsTranslated
}

export const beautifyEventTitle = (event: Event) => {
    switch (event.type) {
        case 'other':
            return '🍾 Outros'
        case 'game':
            return '🏆️ Jogo'
        case 'session':
            return '⚽️ Treino'
        case 'anniversary':
            return '🎂 Aniversário'
    }
}

export const mapPortugueseEventToDatabaseName = (eventType: string | null): keyof typeof OPTIONS | null => {
    switch (eventType) {
        case '🍾 Outros':
            return 'other'
        case '🏆️ Jogo':
            return 'game'
        case '⚽️ Treino':
            return 'session'
        case '🎂 Aniversário':
            return 'anniversary'
    }

    return null
}

export const cleanObject = <T extends object>(obj: T): Partial<T> => {
    const cleanedObject: Partial<T> = {}

    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            cleanedObject[key] = obj[key]
        }
    }

    return cleanedObject
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

export const getAge = (date: string) => {
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
}

export const capitalize = (string: string) => {
    const multipleWords = string.split(' ')
    const hasMultipleWords = !!multipleWords

    if (!hasMultipleWords) {
        const firstLetter = string[0].toUpperCase()
        const remainLetters = string.slice(1)

        const capitalizedString = `${firstLetter}${remainLetters}`
        return capitalizedString
    }

    const capitalizedWordsArray = multipleWords.map((word) => {
        const firstLetter = word[0].toUpperCase()
        const remainLetters = word.slice(1)

        const capitalizedString = `${firstLetter}${remainLetters}`
        return capitalizedString
    })

    return capitalizedWordsArray.join(' ')
}

export const isDatePast = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const dateToNumber = date.setHours(hours, minutes, 0, 0)

    const today = new Date()
    const todayHours = today.getHours()
    const todayMinutes = today.getMinutes()
    const todayToNumber = today.setHours(todayHours, todayMinutes, 0, 0)

    return todayToNumber > dateToNumber
}

export const isBirthdayCurrentMonth = (date: string): boolean => {
    const dob = new Date(date)
    const dobMonth = dob.getMonth()
    const currentMonth = new Date().getMonth()

    return dobMonth === currentMonth
}

export const getGameStatusByResult = (
    result: string,
    isHome: boolean
): { isVictory: boolean; isDraw: boolean; isLoss: boolean; hasResult: boolean } => {
    const goalsScored = (isHome ? result?.split('-')[0] : result?.split('-')[1]) || 0
    const goalsConceded = (isHome ? result?.split('-')[1] : result?.split('-')[0]) || 0
    const isDraw = goalsScored === goalsConceded
    const isVictory = goalsConceded < goalsScored
    const isLoss = goalsConceded > goalsScored
    const hasResult = result !== ''

    return { isVictory, isDraw, isLoss, hasResult }
}

const groupConsecutiveValues = (array: ('V' | 'E' | 'D' | 'N/A' | undefined)[]) => {
    if (array.length === 0) return []

    const result = []
    let count = 1

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1]) {
            count++
        } else {
            result.push(`${count}${array[i - 1]}`)
            count = 1
        }
    }

    // Push the last group
    result.push(`${count}${array[array.length - 1]}`)

    return result
}

export const calculateFinesByGamesRegistry = (
    gamesRegistry: ('V' | 'E' | 'D' | 'N/A' | undefined)[]
): { defeats: number; victories: number } => {
    const totalVictories = groupConsecutiveValues(gamesRegistry)
        .map((registry) => {
            if (registry.includes('V')) {
                if (registry === '1V') return 1.5 as number
                if (registry === '2V') return 3.5 as number
                if (registry === '3V') return 6 as number

                return 6 as number
            }
            return 0
        })
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)

    const totalDefeats = groupConsecutiveValues(gamesRegistry)
        .map((registry) => {
            if (registry.includes('D')) {
                if (registry === '1D') return 1 as number
                if (registry === '2D') return 2.5 as number
                if (registry === '3D') return 4.5 as number

                return 4.5 as number
            }
            return 0
        })
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)

    return { defeats: totalDefeats, victories: totalVictories }
}
