import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Player } from '@/types'

interface IPlayersContextProps {
    children: any
}

interface IPLayerContext {
    players: Player[]
    setPlayers: Dispatch<SetStateAction<Player[]>>
}

export const PlayersContext = createContext<IPLayerContext>({
    players: [],
    setPlayers: () => {
        console.log([])
    },
})

const PlayersContextProvider = ({ children }: IPlayersContextProps) => {
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        const getPlayers = async () => {
            const request = await fetch('/api/players')
            const response = await request.json()

            setPlayers(response.players)
            console.log('Players fetched')
            console.log(response.players)
        }

        getPlayers()
    }, [])

    useEffect(() => {
        console.log('Players context - players: ', players)
    }, [players])

    return <PlayersContext.Provider value={{ players, setPlayers }}>{children}</PlayersContext.Provider>
}

export default PlayersContextProvider
