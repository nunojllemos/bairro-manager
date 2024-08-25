import { useContext } from 'react'
import { FinesContext } from '@/context/FinesContext'

const useFines = () => {
    const { fines } = useContext(FinesContext)

    return { fines }
}

export default useFines
