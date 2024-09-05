import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { setRoleBySessionId } from '@/utils'
import { getCookie } from '@/utils/cookies'
import { User } from '@/types'

export type Role = 'player' | 'mister' | 'cap' | null

interface IAuthContextProps {
    children: any
}

interface IAuthContext {
    isAuthenticated: boolean
    setAuthentication: (bool: boolean) => void
    user: Omit<User, 'password'> | null
    setUser: Dispatch<SetStateAction<Omit<User, 'password'> | null>>
    role: Role
    setRole: Dispatch<SetStateAction<Role>>
    isLoadingAuth: boolean
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    setAuthentication: () => console.log(''),
    role: 'player',
    setRole: () => console.log(''),
    user: { username: 'lemos', role: 'cap', session_id: 'asd' },
    setUser: () => console.log(''),
    isLoadingAuth: true,
})

const AuthContextProvider = ({ children }: IAuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoadingAuth, setIsLoadingAuth] = useState(true)
    const [role, setRole] = useState<Role>(null)
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null)

    const setAuthentication = (boolean: boolean) => {
        setIsAuthenticated(boolean)
    }

    useEffect(() => {
        const sessionId = getCookie('session-id')
        const usernameCookie = getCookie('username')

        if (!!sessionId) {
            setIsAuthenticated(true)
            setRole(setRoleBySessionId(sessionId))
            setIsLoadingAuth(false)
        }

        if (!!usernameCookie) {
            setUser({ username: usernameCookie, role: role, session_id: sessionId || '' })
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setAuthentication, role, setRole, user, setUser, isLoadingAuth }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
