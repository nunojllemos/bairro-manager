import { createContext, useEffect, useState } from 'react'
import { FinesModel } from '@/types'
import useGames from '@/hooks/useGames'
import { calculateFinesByGamesRegistry } from '@/utils'

export type Role = 'fine' | 'mister' | 'cap' | null

interface IFinesContextProps {
    children: any
}

interface IFinesContext {
    fines: FinesModel[]
}

export const FinesContext = createContext<IFinesContext>({
    fines: [],
})

const FinesContextProvider = ({ children }: IFinesContextProps) => {
    const [fines, setFines] = useState<FinesModel[]>([])
    const { games, gamesResultRegistry } = useGames()

    useEffect(() => {
        const getFines = async () => {
            const request = await fetch('/api/fines')
            const fines = await request.json()

            setFines(fines)
            console.log('Fines fetched')
            console.log(fines)
        }

        getFines()
    }, [])

    useEffect(() => {
        const { defeats, victories } = calculateFinesByGamesRegistry(gamesResultRegistry)

        fetch('/api/fines', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ defeats, victories }),
        })
    }, [games, gamesResultRegistry])

    return <FinesContext.Provider value={{ fines }}>{children}</FinesContext.Provider>
}

export default FinesContextProvider
