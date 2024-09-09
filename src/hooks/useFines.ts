import { useContext, useEffect, useState } from 'react'
import { FinesContext } from '@/context/FinesContext'
import usePlayers from './usePlayers'
import useCoaches from './useCoaches'

const useFines = () => {
    const { fines } = useContext(FinesContext)
    const [totalPaid, setTotalPaid] = useState<number | null>(null)
    const [totalDebt, setTotalDebt] = useState<number | null>(null)
    const [totalValue, setTotalValue] = useState<number | null>(null)
    const { players } = usePlayers()
    const { coaches } = useCoaches()

    useEffect(() => {
        if (players.length) {
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
    }, [players, coaches, totalDebt, totalPaid])

    return { fines, totalPaid, totalDebt, totalValue }
}

export default useFines
