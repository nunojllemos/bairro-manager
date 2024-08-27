import { useContext, useEffect, useState } from 'react'
import { FinesContext } from '@/context/FinesContext'
import usePlayers from './usePlayers'

const useFines = () => {
    const { fines } = useContext(FinesContext)
    const [totalPaid, setTotalPaid] = useState<number | null>(null)
    const [totalDebt, setTotalDebt] = useState<number | null>(null)
    const [totalValue, setTotalValue] = useState<number | null>(null)
    const { players } = usePlayers()

    useEffect(() => {
        const totalValuePaid = players
            .map((player) => {
                return player.fines.paid
            })
            .reduce((total, current) => total + current)

        setTotalPaid(totalValuePaid)

        const totalValueDebt = players
            .map((player) => {
                const isNegativeValue = player.fines.total - player.fines.paid < 0

                if (!isNegativeValue) return player.fines.total - player.fines.paid

                return 0
            })
            .reduce((total, current) => total + current)

        setTotalDebt(totalValueDebt)

        if (totalDebt && totalPaid) setTotalValue(totalDebt + totalPaid)
    }, [players, totalDebt, totalPaid])

    return { fines, totalPaid, totalDebt, totalValue }
}

export default useFines
