'use client'
import useFines from '@/hooks/useFines'
import usePlayers from '@/hooks/usePlayers'
import { FinesDetails } from '@/types'
import { localeStringOptions } from '@/utils'
import { CloseOutlined, SaveAltOutlined, SaveOutlined } from '@mui/icons-material'
import { Avatar, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'

interface FinesModalProps {
    id: string
    handleClose: () => void
}

const FinesModal = ({ id, handleClose }: FinesModalProps) => {
    const { getPlayer, updatePlayers } = usePlayers()
    const { fines } = useFines()
    const player = getPlayer(id)
    const form = useRef<HTMLFormElement>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(form.current as HTMLFormElement)

        const data = {
            player_id: id,
            fines: fines
                .map((fine) => {
                    const hasValuesKey = Object.keys(fine).includes('values')
                    if (hasValuesKey) return

                    const value = formData.get(fine._id)

                    if (!value) return
                    return { _id: fine._id, value: +value }
                })
                .filter((fine) => !!fine),
        }

        const request = await fetch('/api/players/fines', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const newPlayer = await request.json()

        updatePlayers(newPlayer.user)
        handleClose()
    }

    return (
        <div className="bg-slate-100 p-16 w-max h-max rounded-md min-w-[40rem]">
            <div className="flex items-center gap-x-2">
                <Avatar sx={{ width: 60, height: 60 }} src={player.avatar} />
                <Typography className="capitalize" variant="h5" component="h2">
                    {player.name}
                </Typography>
            </div>
            <form ref={form} onSubmit={handleSubmit}>
                <ul className="flex flex-col gap-y-6 mt-16 w-full">
                    {fines
                        .filter((fine) => !Object.keys(fine).includes('values'))
                        .map((fine) => {
                            return (
                                <li key={fine._id}>
                                    <TextField
                                        name={fine._id}
                                        type="number"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={fine.name}
                                        placeholder={player.fines.details
                                            .filter((playerFine) => fine._id === playerFine._id)[0]
                                            .value.toString()}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="pl-4 opacity-40" position="start">
                                                    {!Object.keys(fine).includes('values') && (
                                                        <>
                                                            &times;{' '}
                                                            {fine.value?.toLocaleString('pt-PT', localeStringOptions)}{' '}
                                                            &euro;
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
                    <Button
                        onClick={handleClose}
                        color="error"
                        variant="outlined"
                        startIcon={<CloseOutlined fontSize="small" />}
                    >
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
