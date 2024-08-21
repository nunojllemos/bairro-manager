import { getCookie } from '@/utils/cookies'
import { redirect, usePathname } from 'next/navigation'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

type Role = 'player' | 'mister' | 'captain' | null

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
    const pathname = usePathname()

    const setAuthentication = (boolean: boolean) => {
        setIsAuthenticated(boolean)
    }

    useEffect(() => {
        const isAlreadyAuth = getCookie('isAuth') === 't'

        if (isAlreadyAuth) {
            setIsAuthenticated(true)
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
