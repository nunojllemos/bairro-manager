import usePlayers from '@/hooks/usePlayers'
import {
    AddOutlined,
    CloseOutlined,
    DirectionsRunOutlined,
    ExpandMore,
    InfoOutlined,
    SaveOutlined,
    PeopleOutlined,
} from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material'
import Textarea from '@mui/joy/Textarea'
import React, { FormEvent, useState } from 'react'

const POSITIONS = ['GR', 'DD', 'DE', 'DC', 'ME', 'MD', 'MC', 'MDC', 'MOC', 'EE', 'ED', 'PL']
const NUMBER_OF_INITIAL_PLAYERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const NUMBER_OF_SUBSTITUTES_PLAYERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface TeamPlayer {
    id: string
    name: string
    position: string
    goals: string
    yellows: string
    red: string
    subs: string
}

const GamesModal = () => {
    const [homeTeam, setHomeTeam] = useState<TeamPlayer[]>([])
    const { players } = usePlayers()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        const formData = new FormData(form)

        console.log('Opponent:', formData.get('opponent'))
        console.log('Final result:', formData.get('final_result'))
        console.log('Half time result:', formData.get('half_time_result'))
        console.log('Date:', formData.get('date'))
        console.log('Schedule:', formData.get('start'))
        console.log('Home:', !!formData.get('home'))
        console.log('Away:', !!formData.get('away'))
        console.log('Pre game:', formData.get('pre-game'))
        console.log('Pos game:', formData.get('pos-game'))
        console.log('')
        console.log('Bairro tactics:', formData.get('bairro-tactics'))

        NUMBER_OF_INITIAL_PLAYERS.forEach((teamPlayer) => {
            console.log('PLAYER', teamPlayer)
            console.log('Name:', formData.get(`bairro-player-name-${teamPlayer}`))
            console.log('Position:', formData.get(`bairro-player-position-${teamPlayer}`))
            console.log('Goals:', formData.get(`bairro-player-goals-${teamPlayer}`))
            console.log('Yellows:', formData.get(`bairro-player-yellows-${teamPlayer}`))
            console.log('Red:', formData.get(`bairro-player-red-${teamPlayer}`))
            console.log('Subs:', formData.get(`bairro-player-subs-${teamPlayer}`))
            console.log('')
        })
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
                <div className="mb-8 flex flex-col gap-y-6">
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
                    <div className="flex gap-x-4">
                        <TextField
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
                    <div className="flex gap-x-4">
                        <TextField
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
                    <div>
                        <Accordion className="!bg-slate-100 !shadow-md">
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                    <InfoOutlined fontSize="inherit" />
                                    Bairro Futebol Clube
                                </span>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="mt-6">
                                    <FormControl size="small" className="w-full">
                                        <InputLabel id="demo-select-small-label">Tática</InputLabel>
                                        <Select
                                            size="small"
                                            name="bairro-tactics"
                                            className="w-full"
                                            labelId="demo-select-small-label"
                                            value="5-3-2"
                                            label="Tática"
                                            // onChange={handleChange}
                                        >
                                            <MenuItem value="4-4-2">4-4-2</MenuItem>
                                            <MenuItem value="4-3-3">4-3-3</MenuItem>
                                            <MenuItem value="4-2-4">4-2-4</MenuItem>
                                            <MenuItem value="4-2-4">4-2-4</MenuItem>
                                            <MenuItem value="4-2-3-1">4-2-3-1</MenuItem>
                                            <MenuItem value="5-2-1-2">5-2-1-2</MenuItem>
                                            <MenuItem value="5-3-2">5-3-2</MenuItem>
                                            <MenuItem value="5-2-3">5-2-3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* ONZE INICIAL */}
                                <Accordion className="!bg-slate-100 !shadow-md mt-4 !border-none">
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                            <PeopleOutlined fontSize="inherit" />
                                            Onze inicial
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {NUMBER_OF_INITIAL_PLAYERS.map((teamNumber) => {
                                            const initialPlayer = homeTeam[teamNumber - 1]
                                            
                                            return (
                                                <div className="mt-8 flex flex-col gap-y-2">
                                                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                        {teamNumber.toLocaleString('pt-PT', {
                                                            minimumIntegerDigits: 2,
                                                        })}
                                                    </span>
                                                    <div className="flex gap-x-2">
                                                        <FormControl size="small" className="w-[9rem]">
                                                            <InputLabel id="demo-select-small-label">
                                                                Posição
                                                            </InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value={homeTeam?.[teamNumber - 1]?.position || ''}
                                                                name={`bairro-player-position-${teamNumber}`}
                                                                label="Posição"
                                                                onChange={(e) => {
                                                                    setHomeTeam([
                                                                        ...homeTeam,
                                                                        {
                                                                            ...initialPlayer,
                                                                            position: e.target.value,
                                                                        },
                                                                    ])
                                                                }}
                                                            >
                                                                {POSITIONS.map((position) => (
                                                                    <MenuItem value={position}>{position}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl size="small" className="w-full">
                                                            <InputLabel id="demo-select-small-label">Nome</InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value={homeTeam?.[teamNumber - 1]?.name || ''}
                                                                name={`bairro-player-name-${teamNumber}`}
                                                                label="Nome"
                                                                onChange={(e) => {
                                                                    setHomeTeam([
                                                                        ...homeTeam,
                                                                        {
                                                                            ...initialPlayer,
                                                                            name: e.target.value,
                                                                        },
                                                                    ])
                                                                }}
                                                            >
                                                                {players.map((player) => (
                                                                    <MenuItem value={player.name}>
                                                                        {player.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={`bairro-player-goals-${teamNumber}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex gap-x-4 mt-3">
                                                        <TextField
                                                            name={`bairro-player-yellows-${teamNumber}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={`bairro-player-red-${teamNumber}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            placeholder="90'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={`bairro-player-subs-${teamNumber}`}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            placeholder="80'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>

                                {/* SUPLENTES */}
                                <Accordion className="!bg-slate-100 !shadow-md mt-4 !border-none">
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                            <DirectionsRunOutlined fontSize="inherit" />
                                            Suplentes
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {NUMBER_OF_SUBSTITUTES_PLAYERS.map((teamNumber) => {
                                            return (
                                                <div className="mt-8 flex flex-col gap-y-2">
                                                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                        {teamNumber.toLocaleString('pt-PT', {
                                                            minimumIntegerDigits: 2,
                                                        })}
                                                    </span>
                                                    <div className="flex gap-x-2">
                                                        <FormControl size="small" className="w-[9rem]">
                                                            <InputLabel id="demo-select-small-label">
                                                                Posição
                                                            </InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Posição"
                                                                // onChange={handleChange}
                                                            >
                                                                {POSITIONS.map((position) => (
                                                                    <MenuItem value={position}>{position}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl size="small" className="w-full">
                                                            <InputLabel id="demo-select-small-label">Nome</InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Nome"
                                                                // onChange={handleChange}
                                                            >
                                                                {players.map((player) => (
                                                                    <MenuItem value={player.name}>
                                                                        {player.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'goals'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex gap-x-4 mt-3">
                                                        <TextField
                                                            name={'yellows'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={'red'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            placeholder="90'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'subs'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            placeholder="80'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Accordion className="!bg-slate-100 !shadow-md">
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                    <InfoOutlined fontSize="inherit" />
                                    Adversário
                                </span>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="mt-6">
                                    <FormControl size="small" className="w-full">
                                        <InputLabel id="demo-select-small-label">Tática</InputLabel>
                                        <Select
                                            size="small"
                                            className="w-full"
                                            labelId="demo-select-small-label"
                                            value="5-3-2"
                                            label="Tática"
                                            // onChange={handleChange}
                                        >
                                            <MenuItem value="4-4-2">4-4-2</MenuItem>
                                            <MenuItem value="4-3-3">4-3-3</MenuItem>
                                            <MenuItem value="4-2-4">4-2-4</MenuItem>
                                            <MenuItem value="4-2-4">4-2-4</MenuItem>
                                            <MenuItem value="4-2-3-1">4-2-3-1</MenuItem>
                                            <MenuItem value="5-2-1-2">5-2-1-2</MenuItem>
                                            <MenuItem value="5-3-2">5-3-2</MenuItem>
                                            <MenuItem value="5-2-3">5-2-3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* ONZE INICIAL */}
                                <Accordion className="!bg-slate-100 !shadow-md mt-4 !border-none">
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                            <PeopleOutlined fontSize="inherit" />
                                            Onze inicial
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {NUMBER_OF_INITIAL_PLAYERS.map((teamNumber) => {
                                            return (
                                                <div className="mt-8 flex flex-col gap-y-2">
                                                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                        {teamNumber.toLocaleString('pt-PT', {
                                                            minimumIntegerDigits: 2,
                                                        })}
                                                    </span>
                                                    <div className="flex gap-x-2">
                                                        <FormControl size="small" className="w-[9rem]">
                                                            <InputLabel id="demo-select-small-label">
                                                                Posição
                                                            </InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Posição"
                                                                // onChange={handleChange}
                                                            >
                                                                {POSITIONS.map((position) => (
                                                                    <MenuItem value={position}>{position}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl size="small" className="w-full">
                                                            <InputLabel id="demo-select-small-label">Nome</InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Nome"
                                                                // onChange={handleChange}
                                                            >
                                                                {players.map((player) => (
                                                                    <MenuItem value={player.name}>
                                                                        {player.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'goals'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex gap-x-4 mt-3">
                                                        <TextField
                                                            name={'yellows'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={'red'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            placeholder="90'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'subs'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            placeholder="80'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>

                                {/* SUPLENTES */}
                                <Accordion className="!bg-slate-100 !shadow-md mt-4 !border-none">
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                            <DirectionsRunOutlined fontSize="inherit" />
                                            Suplentes
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {NUMBER_OF_SUBSTITUTES_PLAYERS.map((teamNumber) => {
                                            return (
                                                <div className="mt-8 flex flex-col gap-y-2">
                                                    <span className="flex items-center gap-x-1 text-sm text-blue-500">
                                                        {teamNumber.toLocaleString('pt-PT', {
                                                            minimumIntegerDigits: 2,
                                                        })}
                                                    </span>
                                                    <div className="flex gap-x-2">
                                                        <FormControl size="small" className="w-[9rem]">
                                                            <InputLabel id="demo-select-small-label">
                                                                Posição
                                                            </InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Posição"
                                                                // onChange={handleChange}
                                                            >
                                                                {POSITIONS.map((position) => (
                                                                    <MenuItem value={position}>{position}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl size="small" className="w-full">
                                                            <InputLabel id="demo-select-small-label">Nome</InputLabel>
                                                            <Select
                                                                size="small"
                                                                className="w-full"
                                                                labelId="demo-select-small-label"
                                                                value=""
                                                                label="Nome"
                                                                // onChange={handleChange}
                                                            >
                                                                {players.map((player) => (
                                                                    <MenuItem value={player.name}>
                                                                        {player.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'goals'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Golos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex gap-x-4 mt-3">
                                                        <TextField
                                                            name={'yellows'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Amarelos'}
                                                            placeholder="25' 78'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            name={'red'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Vermelho'}
                                                            placeholder="90'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <TextField
                                                            name={'subs'}
                                                            type="text"
                                                            className="w-full"
                                                            variant="outlined"
                                                            size="small"
                                                            label={'Substituído'}
                                                            placeholder="80'"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Textarea name="pre-game" placeholder="Observações pre-jogo..." minRows={4} />
                    </div>
                    <div>
                        <Textarea name="pos-game" placeholder="Observações pos-jogo..." minRows={4} />
                    </div>
                </div>
                <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                    <Button
                        onClick={() => {}}
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
