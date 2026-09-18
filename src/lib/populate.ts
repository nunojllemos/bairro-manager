import mongoose from 'mongoose'
import connectDB from './db'
import PlayerModel from '../models/player'
import { events, players, games, users } from './utils'
import EventModel from '@/models/events'
import GameModel from '@/models/games'
import FinesModel from '@/models/fines'
import UserModel from '@/models/user'

const fines = [
    { name: 'Atraso ao treino', value: 1, description: '' },
    { name: 'Atraso à convocatória', value: 2, description: '' },
    { name: 'Falta injustificada ao treino', value: 2.5, description: '' },
    { name: 'Falta injustificada ao jogo', value: 10, description: '' },
    { name: 'Telemóvel com som na palestra', value: 1, description: '' },
    { name: 'Expulsão desnecessária', value: 10, description: '' },
    { name: 'Roupa virada ou fora dos cestos', value: 0.5, description: '' },
    { name: 'Falta de bolo de aniversário', value: 30, description: '' },
    { name: 'Falta de presença no lanche do jogo', value: 2, description: '' },
    { name: 'Falta de presença no autocarro (ida e volta)', value: 2.5, description: '' },
    { name: 'Derrota', values: [1, 1, 1], description: 'Derrota (p/ os jogadores)' },
    { name: 'Vitória', values: [1, 1, 1], description: 'Vitória (p/ a equipa técnica)' },
]

const populateDB = async () => {
    try {
        await connectDB()
        await PlayerModel.deleteMany({})
        console.log('✅ Players deleted')

        const newPlayers = players.map((player) => new PlayerModel(player))

        await PlayerModel.insertMany(newPlayers)
        console.log('✅ Players populated')
        console.log('')

        await EventModel.deleteMany({})
        console.log('✅ Events deleted')

        const newEvents = events.map((event) => new EventModel(event))

        await EventModel.insertMany(newEvents)
        console.log('✅ Events populated')
        console.log('')

        await GameModel.deleteMany({})
        console.log('✅ Games deleted')

        // const newGames = games.map((event) => new GameModel(event))

        // await GameModel.insertMany(newGames)
        // console.log('✅ Games populated')
        console.log('')

        await FinesModel.deleteMany({})
        console.log('✅ Fines deleted')

        const newFines = fines.map((fine) => new FinesModel(fine))

        await FinesModel.insertMany(newFines)
        console.log('✅ Fines populated')
        console.log('')

        await UserModel.deleteMany({})
        console.log('✅ Users deleted')

        const newUsers = users.map((user) => new UserModel(user))

        await UserModel.insertMany(newUsers)
        console.log('✅ Users populated')
        console.log('')
    } catch (error) {
        console.error('Error populating the database:', error)
    } finally {
        await mongoose.connection.close()
    }
}

populateDB()
