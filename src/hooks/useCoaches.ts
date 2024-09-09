import { useContext } from 'react'
import { CoachesContext } from '@/context/CoachesContext'
import { Coach } from '@/types'

const useCoaches = () => {
    const { coaches, setCoaches } = useContext(CoachesContext)

    const getCoach = (id: string) => coaches.filter((coach) => coach._id === id)[0] || null

    const updateCoach = (coach: Coach) => {
        const updatedCoaches = coaches.map((p) => {
            if (p._id === coach._id) {
                return coach
            }

            return p
        })

        console.log('updatedCoachs', updatedCoaches)

        setCoaches(updatedCoaches)
    }

    return { coaches, getCoach, updateCoach }
}

export default useCoaches
