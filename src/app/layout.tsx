import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Container } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contexts from '@/components/Contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Bairro Futebol Clube | Manager',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-100 text-zinc-800`}>
                <Contexts>
                    <Container className="min-h-screen !flex flex-col w-full">
                        <Header />
                        <main className="py-12">{children}</main>
                        <Footer />
                    </Container>
                </Contexts>
            </body>
        </html>
    )
}
