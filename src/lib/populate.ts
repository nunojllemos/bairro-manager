import mongoose from 'mongoose'
import connectDB from './db'
import PlayerModel from '../models/player'

const populateDB = async () => {
    try {
        await connectDB()

        const players = [
            new PlayerModel({
                name: 'John Doe',
                number: 10,
                avatar: 'https://example.com/avatar1.png',
                assists: 5,
                goals: 12,
                fines: {
                    total: 20,
                    paid: 10,
                    details: [
                        { value: 2, _id: new mongoose.Types.ObjectId() },
                        { value: 5, _id: new mongoose.Types.ObjectId() },
                    ],
                },
                cards: { yellow: 1, red: 0 },
                dob: '1990-01-01',
                is_captain: true,
                points: 50,
                positions: ['FW', 'RW'],
            }),
            new PlayerModel({
                name: 'Jane Smith',
                number: 7,
                avatar: 'https://example.com/avatar2.png',
                assists: 8,
                goals: 10,
                fines: {
                    total: 30,
                    paid: 20,
                    details: [
                        { value: 3, _id: new mongoose.Types.ObjectId() },
                        { value: 6, _id: new mongoose.Types.ObjectId() },
                    ],
                },
                cards: { yellow: 2, red: 1 },
                dob: '1995-02-15',
                is_captain: false,
                points: 40,
                positions: ['MF', 'LW'],
            }),
        ]

        await PlayerModel.insertMany(players)
        console.log('✅ Database populated successfully!')
    } catch (error) {
        console.error('Error populating the database:', error)
    } finally {
        await mongoose.connection.close()
    }
}

populateDB()
