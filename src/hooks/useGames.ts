import { useContext } from 'react'
import { GamesContext } from '@/context/GamesContext'
import { getGameStatusByResult } from '@/utils'

const useGames = () => {
    const { games, setGames } = useContext(GamesContext)

    const gamesResultRegistry = games.map((game) => {
        const status = getGameStatusByResult(game.final_result, game.is_home)

        const isVictory = status.isVictory
        const isDraw = status.isDraw
        const isLoss = !isVictory && !isDraw

        if (isVictory) return 'V'
        if (isDraw) return 'E'
        if (isLoss) return 'D'
    })

    return { games, setGames, gamesResultRegistry }
}

export default useGames
