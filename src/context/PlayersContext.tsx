import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
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
            const players = await request.json()

            console.log(players)
            setPlayers(players)
        }

        getPlayers()
    }, [])

    return (
        <PlayersContext.Provider value={{ players, setPlayers }}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayersContextProvider