import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Player } from '@/types'

interface IPlayersContextProps {
    children: any
}

interface IPLayerContext {
    players: Player[]
    setPlayers: Dispatch<SetStateAction<Player[]>>
    loadingPlayers: boolean
}

export const PlayersContext = createContext<IPLayerContext>({
    players: [],
    setPlayers: () => {
        console.log([])
    },
    loadingPlayers: true,
})

const PlayersContextProvider = ({ children }: IPlayersContextProps) => {
    const [players, setPlayers] = useState<Player[]>([])
    const [loadingPlayers, setLoadingPlayers] = useState(true)

    const getPlayers = async () => {
        const request = await fetch('/api/players')
        const { players } = await request.json()

        setLoadingPlayers(false)
        setPlayers(players)
    }

    useEffect(() => {
        getPlayers()
    }, [])

    return <PlayersContext.Provider value={{ players, setPlayers, loadingPlayers }}>{children}</PlayersContext.Provider>
}

export default PlayersContextProvider
