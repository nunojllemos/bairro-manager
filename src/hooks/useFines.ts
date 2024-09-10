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
    const { players } = usePlayers()
    const { coaches } = useCoaches()
    const { gamesResultRegistry } = useGames()

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
                    const isNegativeValue = person.fines.total - person.fines.paid < 0

                    if (!isNegativeValue) return person.fines.total - person.fines.paid

                    return 0
                })
                .reduce((total, current) => total + current)

            setTotalDebt(totalValueDebt)

            if (totalDebt !== null && totalDebt >= 0 && totalPaid) {
                setTotalValue(totalDebt + totalPaid)
            } else {
                setTotalValue(0)
            }
        }

        const { victories, defeats } = calculateFinesByGamesRegistry(gamesResultRegistry)
        setTotalDefeats(defeats)
        setTotalVictories(victories)
    }, [players, coaches, totalDebt, totalPaid, gamesResultRegistry])

    return { fines, totalPaid, totalDebt, totalValue, totalDefeats, totalVictories }
}

export default useFines
