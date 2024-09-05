import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Container } from '@mui/material'
import Contexts from '@/components/Contexts'
import Layout from '@/components/Layout'

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
                        <Layout>{children}</Layout>
                    </Container>
                </Contexts>
            </body>
        </html>
    )
}
