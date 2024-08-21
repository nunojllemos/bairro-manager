import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setAuthentication, role, setRole } =
        useContext(AuthContext)

    return { isAuthenticated, setAuthentication, role, setRole }
}

export default useAuth
