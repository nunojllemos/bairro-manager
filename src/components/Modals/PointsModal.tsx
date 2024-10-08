import usePlayers from '@/hooks/usePlayers'
import { CloseOutlined, EditOutlined, SaveOutlined } from '@mui/icons-material'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { FormEvent } from 'react'

interface PointsModalProps {
    handleClose: () => void
}

const PointsModal = ({ handleClose }: PointsModalProps) => {
    const { players, updatePlayers } = usePlayers()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        const formData = new FormData(form)

        const pointsTable = players
            .map((player) => {
                const newPoints = formData.get(`points-${player._id}`)

                if (!newPoints) return

                const points = {
                    month: Number(newPoints),
                }

                return { _id: player._id, points }
            })
            .filter((entry) => !!entry)
            .map((entry) => entry)

        try {
            const response = await fetch('api/players/points', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pointsTable),
            })
            const json = await response.json()
            const { updatedPlayers } = await json

            updatePlayers(updatedPlayers)

            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[40rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
            <div className="flex items-center gap-x-2 text-blue-500">
                <EditOutlined fontSize="small" />
                <Typography variant="h5" component="h2">
                    Editar tabela
                </Typography>
            </div>
            <form className="mt-12" onSubmit={handleSubmit}>
                <ul>
                    <li className="flex justify-between items-center px-1 py-2 border-b border-b-slate-300">
                        <span className="text-sm text-blue-500">Nome</span>
                        <span className="text-sm text-blue-500">Pontos do mês</span>
                    </li>
                    {players
                        .sort((a, b) => b.points.month - a.points.month)
                        .map((player, index) => {
                            return (
                                <li
                                    key={player._id}
                                    className="flex justify-between items-center px-1 py-2 border-b border-b-slate-300"
                                >
                                    <div>
                                        <span className="text-sm opacity-50 mr-2">#{index + 1} </span>
                                        <span className=" text-md capitalize leading-none">{player.name}</span>
                                    </div>
                                    <div className="w-[7rem]">
                                        <TextField
                                            type="number"
                                            name={`points-${player._id}`}
                                            size="small"
                                            placeholder="0"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className="opacity-40" position="start">
                                                        {`${player.points.month} + `}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                </ul>
                <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[1]">
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

export default PointsModal
