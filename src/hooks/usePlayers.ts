import { PlayersContext } from '@/context/PlayersContext'
import { useContext } from 'react'

const usePlayers = () => {
    const { players, setPlayers } = useContext(PlayersContext)

    const getPlayer = (id: string) => players.filter((player) => player._id === id)[0] || null

    return { players, setPlayers, getPlayer }
}

export default usePlayers
