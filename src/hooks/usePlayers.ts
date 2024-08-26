import { PlayersContext } from '@/context/PlayersContext'
import { Player } from '@/types'
import { useContext } from 'react'

const usePlayers = () => {
    const { players, setPlayers } = useContext(PlayersContext)

    const getPlayer = (id: string) => players.filter((player) => player._id === id)[0] || null

    const updatePlayers = (player: Player) => {
        const updatedPlayers = players.map((p) => {
            console.log(p)
            console.log(player)
            if (p._id === player._id) {
                return player
            }

            return p
        })

        setPlayers(updatedPlayers)
    }

    return { players, setPlayers, getPlayer, updatePlayers }
}

export default usePlayers
