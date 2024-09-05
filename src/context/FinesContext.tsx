import { createContext, useEffect, useState } from 'react'
import { FinesModel } from '@/types'
import usePlayers from '@/hooks/usePlayers'

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
    const { players } = usePlayers()

    useEffect(() => {
        const getFines = async () => {
            const request = await fetch('/api/fines')
            const fines = await request.json()

            setFines(fines)
        }

        getFines()
    }, [players])

    return <FinesContext.Provider value={{ fines }}>{children}</FinesContext.Provider>
}

export default FinesContextProvider
