import { Game } from '@/types'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

const DEFAULT_VALUE = {
    games: [],
    setGames: () => {},
}

export interface IGame {
    games: Game[]
    setGames: Dispatch<SetStateAction<Game[]>>
}

export const GamesContext = createContext<IGame>(DEFAULT_VALUE)

const GamesContextProvider = ({ children }: any) => {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        const getGames = async () => {
            const request = await fetch('/api/games')
            const { games } = await request.json()

            setGames(games)
        }

        getGames()
    }, [])

    return <GamesContext.Provider value={{ games, setGames }}>{children}</GamesContext.Provider>
}

export default GamesContextProvider
