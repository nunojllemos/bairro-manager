import React, { FormEvent } from 'react'
import { AddOutlined, CloseOutlined, InfoOutlined, SaveOutlined } from '@mui/icons-material'
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Textarea from '@mui/joy/Textarea'
import useGames from '@/hooks/useGames'

const GamesModal = ({ handleClose }: { handleClose: () => void }) => {
    const { setGames } = useGames()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        const formData = new FormData(form)

        try {
            const request = await fetch('/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    opponent: formData.get('opponent'),
                    final_result: formData.get('final_result'),
                    half_time_result: formData.get('half_time_result'),
                    date: {
                        date: formData.get('date'),
                        start: formData.get('start'),
                    },
                    weather: {
                        temp: formData.get('weather-temp'),
                        condition: formData.get('weather-condition'),
                    },
                    is_home: !!formData.get('home'),
                    pre_game: formData.get('pre-game'),
                    pos_game: formData.get('pos-game'),
                }),
            })

            const { games } = await request.json()
            setGames(games)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[60rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
            <div className="flex items-center gap-x-2 text-blue-500">
                <AddOutlined fontSize="small" />
                <Typography variant="h5" component="h2">
                    Adicionar jogo
                </Typography>
            </div>
            <form className="mt-12" onSubmit={handleSubmit}>
                <div className="mb-8 flex flex-col gap-y-4 lg:gap-y-6">
                    <div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="home"
                            className="!flex !gap-x-4 flex-row"
                        >
                            <FormControlLabel
                                className="!text-sm"
                                value="home"
                                name="home"
                                control={<Radio size="small" />}
                                label="Casa"
                            />
                            <FormControlLabel
                                className="!text-sm"
                                value="away"
                                name="away"
                                control={<Radio size="small" />}
                                label="Fora"
                            />
                        </RadioGroup>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <TextField
                            required
                            name={'date'}
                            type="date"
                            className="w-full"
                            variant="outlined"
                            size="small"
                            label={'Data'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            name={'start'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Hora'}
                            placeholder="15:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <TextField
                            required
                            name={'opponent'}
                            type="text"
                            className="w-full"
                            variant="outlined"
                            size="small"
                            label={'Adversário'}
                            placeholder="Ruivães"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name={'final_result'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Resultado final'}
                            placeholder="0-0"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name={'half_time_result'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Ao intervalo'}
                            placeholder="0-0"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <TextField
                            name={'weather-temp'}
                            type="text"
                            variant="outlined"
                            size="small"
                            label={'Temperatura'}
                            placeholder="Cº"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name={'weather-condition'}
                            type="text"
                            className="w-full"
                            variant="outlined"
                            size="small"
                            label={'Condições'}
                            placeholder="Sol"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                            <InfoOutlined fontSize="inherit" />
                            Observações
                        </span>
                        <div>
                            <Textarea name="pre-game" placeholder="Observações pre-jogo..." minRows={4} />
                        </div>
                        <div>
                            <Textarea name="pos-game" placeholder="Observações pos-jogo..." minRows={4} />
                        </div>
                    </div>
                </div>
                <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
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

export default GamesModal
