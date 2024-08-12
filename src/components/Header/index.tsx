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
} from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

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
        <header className="py-4 border-b border-slate-200 flex justify-between items-center bg-slate-100 sticky top-0 w-full">
            <div className="flex flex-col">
                <span className="uppercase font-bold text-xl text-blue-500 leading-none">
                    bairro futebol clube
                </span>
                <span className="text-sm font-light leading-none">manager</span>
            </div>
            <nav>
                <menu className="flex">
                    {navigationLinks.map((link) => {
                        return (
                            <li
                                key={link.name}
                                className="py-2 px-4 border-r border-r-slate-300 last:border-none"
                            >
                                {link.submenu ? (
                                    <>
                                        <Button
                                            id="basic-button"
                                            className="relative text-inherit flex items-center gap-x-1 p-0 leading-normal !text-sm capitalize"
                                            onClick={handleClick}
                                        >
                                            {link.icon} {link.name}{' '}
                                            <div className="text-slate-700 ml-4">
                                                <ExpandMore
                                                    fontSize="inherit"
                                                    className={`${
                                                        open ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </div>
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            {link.submenu.map((subLink) => {
                                                return (
                                                    <MenuItem key={subLink.url}>
                                                        <Link
                                                            className="hover:text-blue-500 transition-colors capitalize text-sm"
                                                            href={subLink.url}
                                                        >
                                                            <span className="flex items-center gap-x-1">
                                                                {subLink.icon}{' '}
                                                                {subLink.name}
                                                            </span>
                                                        </Link>
                                                    </MenuItem>
                                                )
                                            })}
                                        </Menu>
                                    </>
                                ) : (
                                    <Link
                                        className="hover:text-blue-500 transition-colors capitalize text-sm"
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
                </menu>
            </nav>
        </header>
    )
}

export default Header
