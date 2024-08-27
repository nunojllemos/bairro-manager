import { Player } from './../types/index.d'
import { PlayersContext } from '@/context/PlayersContext'
import { Player } from '@/types'
import { useContext } from 'react'

const usePlayers = () => {
    const { players, setPlayers } = useContext(PlayersContext)

    const getPlayer = (id: string) => players.filter((player) => player._id === id)[0] || null

    const updatePlayer = (player: Player) => {
        const updatedPlayers = players.map((p) => {
            if (p._id === player._id) {
                console.log(player)
                return player
            }

            return p
        })

        setPlayers(updatedPlayers)
    }

    const updatePlayers = (updatedPlayersList: Player[]) => {
        const fullUpdatedPlayers = new Map([...players, ...updatedPlayersList].map((item) => [item._id, item])).values()

        setPlayers([...fullUpdatedPlayers])
    }

    return { players, setPlayers, getPlayer, updatePlayer, updatePlayers }
}

export default usePlayers
