import { Role } from '@/context/AuthContext'

export interface User {
    username: string
    role: Role
    password: string
    session_id: string
}
