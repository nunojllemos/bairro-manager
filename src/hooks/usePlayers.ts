import { PlayersContext } from '@/context/PlayersContext'
import { Player } from '@/types'
import { useContext } from 'react'

const usePlayers = () => {
    const { players, setPlayers } = useContext(PlayersContext)

    const getPlayer = (id: string) => players.filter((player) => player._id === id)[0] || null

    const updatePlayers = (player: Player) => {
        const newPlayer = players.filter((p) => p._id === player._id).map((player) => player)
        const playersListWithoutUpdatedPlayer = players.filter((p) => p._id !== player._id)
        console.log(newPlayer)

        setPlayers([...playersListWithoutUpdatedPlayer, ...newPlayer])
    }

    return { players, setPlayers, getPlayer, updatePlayers }
}

export default usePlayers
