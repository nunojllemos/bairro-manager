import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setAuthentication, role, setRole, user, setUser, isLoadingAuth } = useContext(AuthContext)

    return { isAuthenticated, setAuthentication, role, setRole, user, setUser, isLoadingAuth }
}

export default useAuth
