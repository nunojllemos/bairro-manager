'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
    SpaceDashboardOutlined,
    CakeOutlined,
    SavingsOutlined,
    SportsSoccerOutlined,
    InsightsOutlined,
    CalendarMonthOutlined,
    Diversity3Outlined,
    ExpandMore,
    MenuOutlined,
    CloseOutlined,
    EmojiEventsOutlined,
} from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import useAuth from '@/hooks/useAuth'
import { setCookie } from '@/utils/cookies'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated, setAuthentication, setRole } = useAuth()

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const logout = () => {
        setAuthentication(false)
        setRole(null)
        setCookie('session-id', '')
    }

    const navigationLinks = [
        {
            name: 'dashboard',
            url: '/dashboard',
            icon: <SpaceDashboardOutlined fontSize="inherit" />,
        },
        {
            name: 'equipa',
            icon: <Diversity3Outlined fontSize="inherit" />,
            submenu: [
                {
                    name: 'tabela',
                    url: '/table',
                    icon: <EmojiEventsOutlined fontSize="inherit" />,
                },
                {
                    name: 'estatísticas',
                    url: '/stats',
                    icon: <InsightsOutlined fontSize="inherit" />,
                },
                {
                    name: 'jogos',
                    url: '/matches',
                    icon: <SportsSoccerOutlined fontSize="inherit" />,
                },
                {
                    name: 'calendário',
                    url: '/fixture-calendar',
                    icon: <CalendarMonthOutlined fontSize="inherit" />,
                },
            ],
        },
        {
            name: 'aniversários',
            url: '/birthdays',
            icon: <CakeOutlined fontSize="inherit" />,
        },
        {
            name: 'multas',
            url: '/fines',
            icon: <SavingsOutlined fontSize="inherit" />,
        },
    ]

    return (
        <header className="py-4 border-b border-slate-200 flex justify-between items-center bg-slate-100 sticky top-0 w-full z-[1]">
            <Link href="/" className="flex flex-col">
                <span className="uppercase font-bold text-xl text-blue-500 leading-none">bairro futebol clube</span>
                <span className="text-sm font-light leading-none">manager</span>
            </Link>

            <nav
                className={`fixed flex justify-center items-center lg:block lg:static bg-slate-100 w-screen h-screen lg:w-auto lg:h-auto top-0 left-0 transition-transform ${
                    isMenuOpen ? 'translate-x-0 lg:translate-x-0' : 'translate-x-full lg:translate-x-0'
                }`}
            >
                <menu className="flex flex-col gap-y-4 lg:flex-row items-center">
                    {isAuthenticated &&
                        navigationLinks.map((link) => {
                            return (
                                <li key={link.name} className="py-2 px-4 lg:border-r lg:border-r-slate-300">
                                    {link.submenu ? (
                                        <>
                                            <Button
                                                id="basic-button"
                                                className="relative text-inherit flex items-center gap-x-1 p-0 leading-normal !text-2xl lg:!text-sm !capitalize"
                                                onClick={handleClick}
                                            >
                                                {link.icon} {link.name}{' '}
                                                <div className="text-slate-700 ml-4">
                                                    <ExpandMore
                                                        fontSize="inherit"
                                                        className={`${open ? 'rotate-180' : ''}`}
                                                    />
                                                </div>
                                            </Button>
                                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                                {link.submenu.map((subLink) => {
                                                    return (
                                                        <MenuItem key={subLink.url}>
                                                            <Link
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className="hover:text-blue-500 transition-colors capitalize text-2xl lg:text-sm"
                                                                href={subLink.url}
                                                            >
                                                                <span className="flex items-center gap-x-1">
                                                                    {subLink.icon} {subLink.name}
                                                                </span>
                                                            </Link>
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Menu>
                                        </>
                                    ) : (
                                        <Link
                                            onClick={() => setIsMenuOpen(false)}
                                            className="hover:text-blue-500 transition-colors capitalize text-2xl lg:text-sm"
                                            href={link.url}
                                        >
                                            <span className="flex items-center gap-x-1">
                                                {link.icon} {link.name}
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    <li className="ml-4">
                        {!isAuthenticated ? (
                            <Link href="/login">
                                <Button variant="contained">Entrar</Button>
                            </Link>
                        ) : (
                            <Button onClick={logout} variant="outlined">
                                {' '}
                                Sair
                            </Button>
                        )}
                    </li>
                </menu>
            </nav>
            <button onClick={() => setIsMenuOpen((prev) => !prev)} className="block lg:hidden z-10">
                {isMenuOpen ? <CloseOutlined fontSize="medium" /> : <MenuOutlined fontSize="medium" />}
            </button>
        </header>
    )
}

export default Header
