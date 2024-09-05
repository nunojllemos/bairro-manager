'use client'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const { isAuthenticated } = useAuth()

    const isLoginPage = pathname !== '/login'

    return (
        <>
            <Header />
            {isAuthenticated || !isLoginPage ? (
                <main className="py-12">{children}</main>
            ) : (
                <div className="flex justify-center py-8">
                    <span className="text-xl text-center">
                        Por favor faz{' '}
                        <Link className="text-blue-500 underline underline-offset-2" href="/login">
                            login
                        </Link>{' '}
                        na tua conta
                    </span>
                </div>
            )}
            <Footer />
        </>
    )
}

export default Layout
