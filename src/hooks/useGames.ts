import { useContext, useEffect } from 'react'
import { GamesContext } from '@/context/GamesContext'
import { getGameStatusByResult } from '@/utils'

const useGames = () => {
    const { games, setGames } = useContext(GamesContext)

    const getGame = (id: string) => games.filter((game) => game._id === id)[0] || null

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

    return { games, setGames, gamesResultRegistry, getGame }
}

export default useGames
