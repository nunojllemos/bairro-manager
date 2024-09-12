import { Coach } from '@/types'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface CoachesContext {
    coaches: Coach[]
    setCoaches: Dispatch<SetStateAction<Coach[]>>
}

export const CoachesContext = createContext<CoachesContext>({
    coaches: [],
    setCoaches: () => {
        console.log([])
    },
})

const CoachesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [coaches, setCoaches] = useState<Coach[]>([])

    useEffect(() => {
        const getCoaches = async () => {
            const request = await fetch('/api/coaches')
            const { coaches } = await request.json()

            setCoaches(coaches)
        }

        getCoaches()
    }, [])

    return <CoachesContext.Provider value={{ coaches, setCoaches }}>{children}</CoachesContext.Provider>
}

export default CoachesContextProvider
