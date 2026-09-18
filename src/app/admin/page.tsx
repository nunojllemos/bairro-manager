'use client'
import { FinesContext } from '@/context/FinesContext'
import { PlayersContext } from '@/context/PlayersContext'
import { CoachesContext } from '@/context/CoachesContext'
import { Coach } from '@/types'
import {
    AddOutlined,
    CloseOutlined,
    DeleteOutline,
    Diversity3Outlined,
    EditOutlined,
    GroupsOutlined,
    SaveOutlined,
    SavingsOutlined,
} from '@mui/icons-material'
import {
    Button,
    Divider,
    IconButton,
    MenuItem,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'

type Views = 'players' | 'coaches' | 'fines'

const coachRoles: Record<string, string> = {
    main: 'Principal',
    assistant: 'Adjunto',
    goalkeepers: 'Guarda-redes',
}

const Admin = () => {
    const [view, setView] = useState<Views>('players')
    const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false)
    const [isDeletePlayerModalOpen, setIsDeletePlayerModalOpen] = useState(false)
    const [isFinesModalOpen, setIsFinesModalOpen] = useState(false)
    const [isDeleteFineModalOpen, setIsDeleteFineModalOpen] = useState(false)
    const [isEditCoachModalOpen, setIsEditCoachModalOpen] = useState(false)
    const [isAddCoachModalOpen, setIsAddCoachModalOpen] = useState(false)
    const [isDeleteCoachModalOpen, setIsDeleteCoachModalOpen] = useState(false)

    const [player, setPlayer] = useState<{ id: string; name: string } | null>(null)
    const [fine, setFine] = useState<{ id: string; name: string } | null>(null)
    const [coach, setCoach] = useState<Coach | null>(null)
    const { players } = useContext(PlayersContext)
    const { fines } = useContext(FinesContext)
    const { coaches, setCoaches } = useContext(CoachesContext)

    const handleClosePlayersModal = () => setIsPlayersModalOpen(false)

    const handleCloseFinesModal = () => setIsFinesModalOpen(false)

    const handleClosePlayersDeleteModal = () => setIsDeletePlayerModalOpen(false)

    const handleCloseFinesDeleteModal = () => setIsDeleteFineModalOpen(false)

    const handleOpenPlayersDeleteModal = () => setIsDeletePlayerModalOpen(true)

    const handleOpenFinesDeleteModal = () => setIsDeleteFineModalOpen(true)

    const handleSubmitPlayersForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const name = formData.get(`name`)
        const dob = formData.get(`dob`)
        const number = formData.get(`number`)

        const data = { name, dob, number }

        try {
            const request = await fetch('/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            handleClosePlayersModal()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitAddCoachForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const name = formData.get('name')
        const dob = formData.get('dob')
        const role = formData.get('role')

        const data = { name, dob, role }

        try {
            const request = await fetch('/api/coaches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const response = await request.json()

            setCoaches([...coaches, response.coach])
            setIsAddCoachModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCoach = async (id: string) => {
        try {
            const request = await fetch('/api/coaches', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            })
            const response = await request.json()
            setCoaches(coaches.filter((c) => c._id !== id))
            setTimeout(() => setIsDeleteCoachModalOpen(false), 1500)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitCoachesForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const name = formData.get('name')
        const dob = formData.get('dob')

        try {
            const request = await fetch('/api/coaches', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: coach?._id, name, dob }),
            })
            const response = await request.json()

            if (coach) {
                const updatedCoaches = coaches.map((c) => (c._id === coach._id ? response.coach : c))
                setCoaches(updatedCoaches)
            }

            setIsEditCoachModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitFinesForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const name = formData.get(`name`)
        const description = formData.get(`description`)
        const value = formData.get(`value`)

        const data = { name, description, value }

        try {
            const request = await fetch('/api/fines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const response = await request.json()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const request = await fetch('/api/players', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            })
            const response = await request.json()
            setTimeout(() => handleClosePlayersDeleteModal(), 1500)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFineDelete = async (id: string) => {
        try {
            const request = await fetch('/api/fines', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            })
            const response = await request.json()
            setTimeout(() => handleCloseFinesDeleteModal(), 1500)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <nav className="mb-4">
                <menu className="flex gap-x-4">
                    <li
                        onClick={() => setView('players')}
                        className={`hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-colors capitalize text-xl lg:text-sm rounded-md border border-slate-200 py-1 lg:py-2 px-4 ${
                            view === 'players' ? 'text-blue-500 border-blue-500' : ''
                        }`}
                    >
                        <Diversity3Outlined fontSize="inherit" /> Jogadores
                    </li>

                    <li
                        onClick={() => setView('coaches')}
                        className={`hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-colors capitalize text-xl lg:text-sm rounded-md border border-slate-200 py-1 lg:py-2 px-4 ${
                            view === 'coaches' ? 'text-blue-500 border-blue-500' : ''
                        }`}
                    >
                        <GroupsOutlined fontSize="inherit" /> Treinadores
                    </li>

                    <li
                        onClick={() => setView('fines')}
                        className={`hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-colors capitalize text-xl lg:text-sm rounded-md border border-slate-200 py-1 lg:py-2 px-4 ${
                            view === 'fines' ? 'text-blue-500 border-blue-500' : ''
                        }`}
                    >
                        <SavingsOutlined fontSize="inherit" /> Multas
                    </li>
                </menu>
            </nav>
            <Divider />

            {view === 'players' && (
                <>
                    <section className="mt-8">
                        <div className="mb-8">
                            <Typography>Espaço dedicado a editar e adicionar jogadores e outros dados</Typography>
                        </div>
                        <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                            <Diversity3Outlined fontSize="inherit" />
                            <Typography variant="inherit" className="font-semibold leading-none">
                                Jogadores
                            </Typography>
                        </div>
                        <div className="mt-8">
                            <Button
                                onClick={() => setIsPlayersModalOpen(true)}
                                type="button"
                                variant="contained"
                                startIcon={<AddOutlined fontSize="small" />}
                            >
                                Adicionar jogador
                            </Button>
                        </div>
                        <div className="mt-8">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="!font-semibold !text-blue-500">Nome</TableCell>
                                            <TableCell align="right" className="!font-semibold !text-blue-500">
                                                Ações
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {players
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((player, index) => {
                                                return (
                                                    <TableRow
                                                        className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                                                        key={player._id}
                                                    >
                                                        <TableCell size="small">{player.name}</TableCell>
                                                        <TableCell size="small" align="right">
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleOpenPlayersDeleteModal()
                                                                    setPlayer({ id: player._id, name: player.name })
                                                                }}
                                                            >
                                                                <DeleteOutline fontSize="small" color="error" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </section>
                    <Modal
                        open={isPlayersModalOpen}
                        onClose={handleClosePlayersModal}
                        className="flex items-center justify-center"
                    >
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[60rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <div className="flex items-center gap-x-2 text-blue-500">
                                <AddOutlined fontSize="small" />
                                <Typography variant="h5" component="h2">
                                    Adicionar jogador
                                </Typography>
                            </div>
                            <form onSubmit={handleSubmitPlayersForm} className="mt-12">
                                <div className="mb-8 flex flex-col gap-y-4 lg:gap-y-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <TextField
                                            required
                                            name={'name'}
                                            type="text"
                                            className="w-full"
                                            variant="outlined"
                                            size="small"
                                            label={'Nome'}
                                            placeholder="João"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            name={'dob'}
                                            type="date"
                                            variant="outlined"
                                            size="small"
                                            label={'Data de nascimento'}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            name={'number'}
                                            type="number"
                                            variant="outlined"
                                            size="small"
                                            label={'Número'}
                                            placeholder="5"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                                    <Button
                                        onClick={handleClosePlayersModal}
                                        color="error"
                                        variant="outlined"
                                        startIcon={<CloseOutlined fontSize="small" />}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveOutlined fontSize="small" />}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal
                        open={isDeletePlayerModalOpen}
                        onClose={handleClosePlayersDeleteModal}
                        className="flex items-center justify-center"
                    >
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[30rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <Typography>
                                Tens a certeza que queres apagar o <span className="font-bold">{player?.name}</span>?
                            </Typography>

                            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                                <Button
                                    type="button"
                                    variant="contained"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => setTimeout(handleClosePlayersDeleteModal, 1500)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => handleDelete(player?.id || '')}
                                >
                                    Apagar
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}

            {view === 'coaches' && (
                <>
                    <section className="mt-8">
                        <div className="mb-8">
                            <Typography>Espaço dedicado a gerir os treinadores e os seus dados</Typography>
                        </div>
                        <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                            <GroupsOutlined fontSize="inherit" />
                            <Typography variant="inherit" className="font-semibold leading-none">
                                Treinadores
                            </Typography>
                        </div>
                        <div className="mt-8">
                            <Button
                                onClick={() => setIsAddCoachModalOpen(true)}
                                type="button"
                                variant="contained"
                                startIcon={<AddOutlined fontSize="small" />}
                            >
                                Adicionar treinador
                            </Button>
                        </div>

                        <div className="mt-8">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="!font-semibold !text-blue-500">Nome</TableCell>
                                            <TableCell className="!font-semibold !text-blue-500">Função</TableCell>
                                            <TableCell className="!font-semibold !text-blue-500">
                                                Data de nascimento
                                            </TableCell>
                                            <TableCell align="right" className="!font-semibold !text-blue-500">
                                                Ações
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coaches.map((c, index) => {
                                            return (
                                                <TableRow
                                                    className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                                                    key={c._id}
                                                >
                                                    <TableCell size="small" className="capitalize">
                                                        {c.name}
                                                    </TableCell>
                                                    <TableCell size="small">{coachRoles[c.role] || c.role}</TableCell>
                                                    <TableCell size="small">
                                                        {c.dob && !Number.isNaN(new Date(c.dob).getTime())
                                                            ? new Date(c.dob).toLocaleDateString('pt-PT')
                                                            : 'Sem data'}
                                                    </TableCell>
                                                    <TableCell size="small" align="right">
                                                        <IconButton
                                                            onClick={() => {
                                                                setCoach(c)
                                                                setIsEditCoachModalOpen(true)
                                                            }}
                                                        >
                                                            <EditOutlined fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                setCoach(c)
                                                                setIsDeleteCoachModalOpen(true)
                                                            }}
                                                        >
                                                            <DeleteOutline fontSize="small" color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </section>
                    <Modal
                        open={isEditCoachModalOpen}
                        onClose={() => setIsEditCoachModalOpen(false)}
                        className="flex items-center justify-center"
                    >
                        <form
                            key={coach?._id}
                            onSubmit={handleSubmitCoachesForm}
                            className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[40rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto overflow-x-hidden relative"
                        >
                            <div className="flex items-center gap-x-2 text-blue-500">
                                <EditOutlined fontSize="small" />
                                <Typography variant="h5" component="h2">
                                    Editar treinador
                                </Typography>
                            </div>
                            <div className="mt-12">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <TextField
                                        name={'name'}
                                        type="text"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={'Nome'}
                                        defaultValue={coach?.name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        name={'dob'}
                                        type="date"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={'Data de nascimento'}
                                        defaultValue={coach?.dob}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-12 py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                                <Button
                                    onClick={() => setIsEditCoachModalOpen(false)}
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
                    </Modal>
                    <Modal
                        open={isAddCoachModalOpen}
                        onClose={() => setIsAddCoachModalOpen(false)}
                        className="flex items-center justify-center"
                    >
                        <form
                            onSubmit={handleSubmitAddCoachForm}
                            className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[40rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto overflow-x-hidden relative"
                        >
                            <div className="flex items-center gap-x-2 text-blue-500">
                                <AddOutlined fontSize="small" />
                                <Typography variant="h5" component="h2">
                                    Adicionar treinador
                                </Typography>
                            </div>
                            <div className="mt-12">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <TextField
                                        required
                                        name={'name'}
                                        type="text"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={'Nome'}
                                        placeholder="José"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        name={'dob'}
                                        type="date"
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={'Data de nascimento'}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        required
                                        name={'role'}
                                        select
                                        className="w-full"
                                        variant="outlined"
                                        size="small"
                                        label={'Função'}
                                        defaultValue="main"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        <MenuItem value="main">Principal</MenuItem>
                                        <MenuItem value="assistant">Adjunto</MenuItem>
                                        <MenuItem value="goalkeepers">Guarda-redes</MenuItem>
                                    </TextField>
                                </div>
                            </div>

                            <div className="mt-12 py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                                <Button
                                    onClick={() => setIsAddCoachModalOpen(false)}
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
                    </Modal>
                    <Modal
                        open={isDeleteCoachModalOpen}
                        onClose={() => setIsDeleteCoachModalOpen(false)}
                        className="flex items-center justify-center"
                    >
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[30rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <Typography>
                                Tens a certeza que queres apagar o <span className="font-bold">{coach?.name}</span>?
                            </Typography>

                            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                                <Button
                                    type="button"
                                    variant="contained"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => setTimeout(() => setIsDeleteCoachModalOpen(false), 1500)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => handleDeleteCoach(coach?._id || '')}
                                >
                                    Apagar
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}

            {view === 'fines' && (
                <>
                    <section className="mt-8">
                        <div className="mb-8">
                            <Typography>Espaço dedicado a editar e adicionar multas e outros dados</Typography>
                        </div>
                        <div className="flex text-4xl lg:text-5xl items-center gap-x-4 text-blue-500">
                            <SavingsOutlined fontSize="inherit" />
                            <Typography variant="inherit" className="font-semibold leading-none">
                                Multas
                            </Typography>
                        </div>
                        <div className="mt-8">
                            <Button
                                onClick={() => setIsFinesModalOpen(true)}
                                type="button"
                                variant="contained"
                                startIcon={<AddOutlined fontSize="small" />}
                            >
                                Adicionar multa
                            </Button>
                        </div>

                        <div className="mt-8">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="!font-semibold !text-blue-500">Nome</TableCell>
                                            <TableCell align="right" className="!font-semibold !text-blue-500">
                                                Valor
                                            </TableCell>
                                            <TableCell align="right" className="!font-semibold !text-blue-500">
                                                Ações
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fines.map((fine, index) => {
                                            return (
                                                <TableRow
                                                    className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                                                    key={fine._id}
                                                >
                                                    <TableCell size="small">{fine.name}</TableCell>
                                                    <TableCell size="small" align="right">
                                                        {fine.value}€
                                                    </TableCell>
                                                    <TableCell size="small" align="right">
                                                        <IconButton
                                                            onClick={() => {
                                                                // handleOpenFinesDeleteModal()
                                                                // setFine({ id: fine._id, name: fine.name })
                                                            }}
                                                        >
                                                            <EditOutlined fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                handleOpenFinesDeleteModal()
                                                                setFine({ id: fine._id, name: fine.name })
                                                            }}
                                                        >
                                                            <DeleteOutline fontSize="small" color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </section>

                    <Modal open={isFinesModalOpen} onClose={() => {}} className="flex items-center justify-center">
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[60rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <div className="flex items-center gap-x-2 text-blue-500">
                                <SavingsOutlined fontSize="small" />
                                <Typography variant="h5" component="h2">
                                    Adicionar multa
                                </Typography>
                            </div>
                            <form onSubmit={handleSubmitFinesForm} className="mt-12">
                                <div className="mb-8 flex flex-col gap-y-4 lg:gap-y-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <TextField
                                            required
                                            name={'name'}
                                            type="text"
                                            className="w-full"
                                            variant="outlined"
                                            size="small"
                                            label={'Nome'}
                                            placeholder="Expulsão"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            required
                                            name={'description'}
                                            type="text"
                                            className="w-full"
                                            variant="outlined"
                                            size="small"
                                            label={'Descrição'}
                                            placeholder="Uma expulsão por atos estúpidos..."
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            required
                                            name={'value'}
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            label={'Valor'}
                                            placeholder="15.5"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: <span className="text-gray-400 pr-2">€</span>,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="py-8 flex flex-col md:flex-row gap-4 justify-end sticky -bottom-6 md:-bottom-16 bg-slate-100 z-[3] w-[calc(100%_+_1rem)] pr-1 -ml-2">
                                    <Button
                                        onClick={handleCloseFinesModal}
                                        color="error"
                                        variant="outlined"
                                        startIcon={<CloseOutlined fontSize="small" />}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveOutlined fontSize="small" />}
                                        onClick={() => setTimeout(handleCloseFinesModal, 1500)}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal open={isDeleteFineModalOpen} onClose={() => {}} className="flex items-center justify-center">
                        <div className="bg-slate-100 p-6 md:p-16 h-max rounded-md w-[calc(100%_-_2rem)] md:w-[30rem] max-h-[calc(100vh_-_4rem)] overflow-y-auto relative">
                            <Typography>
                                Tens a certeza que queres apagar o <span className="font-bold">{fine?.name}</span>?
                            </Typography>

                            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-end">
                                <Button
                                    type="button"
                                    variant="contained"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => {}}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    startIcon={<SaveOutlined fontSize="small" />}
                                    onClick={() => handleFineDelete(fine?.id || '')}
                                >
                                    Apagar
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Admin
