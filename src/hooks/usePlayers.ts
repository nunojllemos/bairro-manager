import { PlayersContext } from '@/context/PlayersContext'
import { Player } from '@/types'
import { useContext, useEffect } from 'react'

const usePlayers = () => {
    const { players, setPlayers } = useContext(PlayersContext)

    const getPlayer = (id: string) => players.filter((player) => player._id === id)[0] || null

    const updatePlayer = (player: Player) => {
        const updatedPlayers = players.map((p) => {
            if (p._id === player._id) {
                return player
            }

            return p
        })

        console.log('updatedPlayers', updatedPlayers)

        setPlayers(updatedPlayers)
    }

    const updatePlayers = (updatedPlayersList: Player[]) => {
        const fullUpdatedPlayers = new Map([...players, ...updatedPlayersList].map((item) => [item._id, item])).values()

        setPlayers([...fullUpdatedPlayers])
    }

    useEffect(() => {
        console.log('Inside usePlayers')
    }, [])

    return { players, setPlayers, getPlayer, updatePlayer, updatePlayers }
}

export default usePlayers
