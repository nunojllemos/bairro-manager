import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IAuthContextProps {
    children: any
}

interface IAuthContext {
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    setIsAuthenticated: () => {
        console.log('')
    },
})

const AuthContextProvider = ({ children }: IAuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
