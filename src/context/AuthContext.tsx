import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

type Role = 'user' | 'mister' | 'captain'

interface IAuthContextProps {
    children: any
}

interface IAuthContext {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    role: Role
    setRole: Dispatch<SetStateAction<Role>>
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    setIsAuthenticated: () => console.log(''),
    role: 'user',
    setRole: () => console.log(''),
})

const AuthContextProvider = ({ children }: IAuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState<Role>('user')

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, role, setRole }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
