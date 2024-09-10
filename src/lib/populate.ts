import mongoose from 'mongoose'
import connectDB from './db'
import PlayerModel from '../models/player'
import { events, players, games } from './utils'
import EventModel from '@/models/events'
import GameModel from '@/models/games'

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

        const newGames = games.map((event) => new GameModel(event))

        await GameModel.insertMany(newGames)
        console.log('✅ Games populated')
        console.log('')
    } catch (error) {
        console.error('Error populating the database:', error)
    } finally {
        await mongoose.connection.close()
    }
}

populateDB()
