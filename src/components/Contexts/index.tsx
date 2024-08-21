'use client'
import React from 'react'
import AuthContextProvider from '@/context/AuthContext'

const Contexts = ({ children }: { children: React.ReactNode }) => {
    return <AuthContextProvider>{children}</AuthContextProvider>
}

export default Contexts
