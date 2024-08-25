'use client'
import useFines from '@/hooks/useFines'
import usePlayers from '@/hooks/usePlayers'
import { FinesDetails } from '@/types'
import { localeStringOptions } from '@/utils'
import { CloseOutlined, SaveAltOutlined, SaveOutlined } from '@mui/icons-material'
import { Avatar, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface FinesModalProps {
    id: string
}

const FinesModal = ({ id }: FinesModalProps) => {
    const { getPlayer } = usePlayers()
    const { fines } = useFines()
    const player = getPlayer(id)
    const [updatedFines, setUpdatedFines] = useState<FinesDetails[]>([])

    const handleChange = (id: string, value: number) => {
        // const value = event.target.value

        setUpdatedFines([...updatedFines])
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch('/api/players', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ test: 'test' }),
        })
    }

    return (
        <div className="bg-slate-100 p-16 w-max h-max rounded-md min-w-[40rem]">
            <div className="flex items-center gap-x-2">
                <Avatar sx={{ width: 60, height: 60 }} src={player.avatar} />
                <Typography className="capitalize" variant="h5" component="h2">
                    {player.name}
                </Typography>
            </div>
            <form onSubmit={handleSubmit}>
                <ul className="flex flex-col gap-y-6 mt-16 w-full">
                    {fines
                        .filter((fine) => !Object.keys(fine).includes('values'))
                        .map((fine) => {
                            return (
                                <li key={fine._id}>
                                    <span></span>
                                    <TextField
                                        type="number"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={fine.name}
                                        onChange={() => handleChange('', 0)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
                                            endAdornment: (
                                                <InputAdornment className="pl-4" position="start">
                                                    {!Object.keys(fine).includes('values') && (
                                                        <>
                                                            &times;{' '}
                                                            {fine.value?.toLocaleString('pt-PT', localeStringOptions)}
                                                        </>
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </li>
                            )
                        })}
                </ul>
                <div className="mt-12 flex gap-x-4 justify-end">
                    <Button color="error" variant="outlined" startIcon={<CloseOutlined fontSize="small" />}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" startIcon={<SaveOutlined fontSize="small" />}>
                        Guardar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FinesModal
