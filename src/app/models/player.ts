import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IPlayer extends Document {
    name: string
    number: number
    createdAt: Date
    updatedAt: Date
}

const playerSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'players',
    }
)

const Player =
    mongoose.models.Player || mongoose.model<IPlayer>('Player', playerSchema)

export default Player
