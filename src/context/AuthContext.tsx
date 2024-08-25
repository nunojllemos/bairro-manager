import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { setRoleBySessionId } from '@/utils'
import { getCookie } from '@/utils/cookies'

export type Role = 'player' | 'mister' | 'cap' | null

interface IAuthContextProps {
    children: any
}

interface IAuthContext {
    isAuthenticated: boolean
    setAuthentication: (bool: boolean) => void
    role: Role
    setRole: Dispatch<SetStateAction<Role>>
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    setAuthentication: () => console.log(''),
    role: 'player',
    setRole: () => console.log(''),
})

const AuthContextProvider = ({ children }: IAuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState<Role>(null)

    const setAuthentication = (boolean: boolean) => {
        setIsAuthenticated(boolean)
    }

    useEffect(() => {
        const sessionId = getCookie('session-id')

        if (sessionId) {
            setIsAuthenticated(true)
            setRole(setRoleBySessionId(sessionId))
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setAuthentication, role, setRole }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
