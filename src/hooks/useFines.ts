import { useContext, useEffect, useState } from 'react'
import { FinesContext } from '@/context/FinesContext'
import usePlayers from './usePlayers'
import useCoaches from './useCoaches'
import { calculateFinesByGamesRegistry } from '@/utils'
import useGames from './useGames'

const useFines = () => {
    const { fines } = useContext(FinesContext)
    const [totalPaid, setTotalPaid] = useState<number | null>(null)
    const [totalDebt, setTotalDebt] = useState<number | null>(null)
    const [totalValue, setTotalValue] = useState<number | null>(null)
    const [totalDefeats, setTotalDefeats] = useState<number | null>(null)
    const [totalVictories, setTotalVictories] = useState<number | null>(null)
    const { players, setPlayers } = usePlayers()
    const { coaches, setCoaches } = useCoaches()
    const { gamesResultRegistry } = useGames()

    const resetAllFines = async () => {
        try {
            const request = await fetch('/api/fines/reset', { method: 'POST' })

            if (!request.ok) return false

            const resetFines = { total: 0, paid: 0, details: [] }

            setPlayers((currentPlayers) =>
                currentPlayers.map((player) => ({ ...player, fines: { ...resetFines } }))
            )
            setCoaches((currentCoaches) =>
                currentCoaches.map((coach) => ({ ...coach, fines: { ...resetFines } }))
            )

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    useEffect(() => {
        if (players.length && coaches.length) {
            const totalValuePaid = [...players, ...coaches]
                .map((person) => {
                    return person.fines.paid
                })
                .reduce((total, current) => total + current)

            setTotalPaid(totalValuePaid)

            const totalValueDebt = [...players, ...coaches]
                .map((person) => {
                    // const isNegativeValue = person.fines.total - person.fines.paid < 0

                    // if (!isNegativeValue) return person.fines.total - person.fines.paid

                    // return 0
                    return person.fines.total
                })
                .reduce((total, current) => total + current)

            setTotalDebt(totalValueDebt)

            if (totalDebt !== null && totalDebt >= 0 && totalPaid) {
                setTotalValue(totalDebt - totalPaid)
            } else {
                setTotalValue(0)
            }
        }

        const { victories, defeats } = calculateFinesByGamesRegistry(gamesResultRegistry)
        setTotalDefeats(defeats)
        setTotalVictories(victories)
    }, [players, coaches, totalDebt, totalPaid, gamesResultRegistry])

    return { fines, totalPaid, totalDebt, totalValue, totalDefeats, totalVictories, resetAllFines }
}

export default useFines
