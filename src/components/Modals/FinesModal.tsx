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
    const { getPlayer, updatePlayer } = usePlayers()
    const { fines } = useFines()
    const player = getPlayer(id)
    const form = useRef<HTMLFormElement>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(form.current as HTMLFormElement)

        // console.log('player: ', player)

        const data = {
            player_id: id,
            paid: formData.get('paid'),
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

        console.log(newPlayer.player)

        updatePlayer(newPlayer.player)
        handleClose()
    }

    return (
        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[40rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto">
            <div className="flex items-center gap-x-2">
                <div className="w-12 h-12 md:w-16 md:h-16">
                    <Avatar sx={{ width: '100%', height: '100%' }} src={player.avatar} />
                </div>
                <Typography className="capitalize" variant="h5" component="h2">
                    {player.name}
                </Typography>
            </div>
            <form ref={form} onSubmit={handleSubmit}>
                <div className="relative after:block after:absolute after:bottom-0 after:w-full after:h-12 after:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(241,245,249,1)_100%)]">
                    <ul className="flex flex-col gap-y-6 mt-16 pb-16 w-full h-[60vh] overflow-y-auto">
                        <li className="p-4 rounded-lg bg-green-100/60">
                            <TextField
                                name={'paid'}
                                color="success"
                                className="w-full"
                                variant="outlined"
                                size="small"
                                label={'Pago'}
                                placeholder="Valor atual + pagamento"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment className="pl-4 opacity-40" position="start">
                                            {`Atual: ${player.fines.paid} €`}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </li>
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
                                            placeholder={
                                                player.fines.details
                                                    .filter((playerFine) => fine._id === playerFine._id)[0]
                                                    ?.value.toString() || '0'
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment className="pl-4 opacity-40" position="start">
                                                        {!Object.keys(fine).includes('values') && (
                                                            <>
                                                                &times;{' '}
                                                                {fine.value?.toLocaleString(
                                                                    'pt-PT',
                                                                    localeStringOptions
                                                                )}{' '}
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
                </div>
                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
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
