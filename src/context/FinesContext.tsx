import { createContext, useEffect, useState } from 'react'
import { FinesModel } from '@/types'

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

    useEffect(() => {
        const getFines = async () => {
            const request = await fetch('/api/fines')
            const fines = await request.json()

            setFines(fines)
        }

        getFines()
    }, [])

    return <FinesContext.Provider value={{ fines }}>{children}</FinesContext.Provider>
}

export default FinesContextProvider
