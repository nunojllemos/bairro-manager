import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated, role, setRole } =
        useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        console.log('IN')
        console.log(document.cookie)
        
    }, [])

    const getRole = () => role

    const checkAuthStatus = () => {
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }

    return { isAuthenticated, setIsAuthenticated, checkAuthStatus, getRole }
}

export default useAuth
