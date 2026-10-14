import { useContext, useEffect } from 'react'
import { GamesContext } from '@/context/GamesContext'
import { getGameStatusByResult } from '@/utils'

const useGames = () => {
    const { games, setGames } = useContext(GamesContext)

    const getGame = (id: string) => games.filter((game) => game._id === id)[0] || null

    const deleteGame = async (id: string) => {
        try {
            const request = await fetch('/api/games', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameId: id }),
            })

            if (!request.ok) return false

            setGames((currentGames) => currentGames.filter((game) => game._id !== id))

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const deleteAllGames = async () => {
        try {
            const request = await fetch('/api/games', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ all: true }),
            })

            if (!request.ok) return false

            setGames([])

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const gamesResultRegistry = games
        .map((game) => {
            if (game.final_result !== '') {
                const { isVictory, isDraw, isLoss, hasResult } = getGameStatusByResult(game.final_result, game.is_home)

                if (isVictory) return 'V'
                if (isDraw) return 'E'
                if (isLoss) return 'D'
            }
        })
        .filter((result) => !!result)

    return { games, setGames, gamesResultRegistry, getGame, deleteGame, deleteAllGames }
}

export default useGames
