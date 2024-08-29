import { Role } from '@/context/AuthContext'

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
