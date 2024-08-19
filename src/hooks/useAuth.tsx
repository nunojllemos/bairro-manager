import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const router = useRouter()

    const checkAuthStatus = () => {
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }

    return { isAuthenticated, setIsAuthenticated, checkAuthStatus }
}

export default useAuth
