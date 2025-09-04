'use client'
import React, { useEffect, useRef } from 'react'

const Footer = () => {
    const randomWord = useRef('amor')

    useEffect(() => {
        const words = ['amor', 'raça', 'alma', 'atitude', 'dedicação', 'caráter']

        randomWord.current = words[Math.floor(Math.random() * words.length)]
    }, [])

    return (
        <footer className="py-2 flex justify-center border-t border-slate-200 mt-auto">
            <span className="text-xs font-light text-zinc-600">
                developed with <span className="text-red-400">{randomWord.current}</span>
            </span>
        </footer>
    )
}

export default Footer
