import mongoose, { Schema, Document } from 'mongoose'

interface Player extends Document {
    fines: {
        total: number
        paid: number
        details: { value: number; _id: string }[]
    }
    name: string
    number: number
    avatar: string
    assists: number
    cards: { yellow: number; red: number }
    dob: string
    goals: number
    is_captain: boolean
    points: {
        month: number
        total: number
    }
    positions: string[]
}

// Define the schema for the fines
const FineDetailsSchema = new Schema({
    value: { type: Number, required: true },
    _id: { type: String, required: true },
})

const FinesSchema = new Schema({
    total: { type: Number, required: true },
    paid: { type: Number, required: true },
    details: [FineDetailsSchema],
})

// Define the main schema for the Player model
const PlayerSchema: Schema = new Schema(
    {
        fines: { type: FinesSchema, required: true },
        name: { type: String, required: true },
        number: { type: Number, required: true },
        avatar: { type: String },
        assists: { type: Number, required: true },
        cards: {
            yellow: { type: Number, required: true },
            red: { type: Number, required: true },
        },
        dob: { type: String, required: true },
        goals: { type: Number, required: true },
        is_captain: { type: Boolean, required: true },
        points: {
            month: { type: Number, required: true },
            total: { type: Number, required: true },
        },
        positions: { type: [String], required: true },
    },
    { timestamps: true }
)

// Create and export the model
const PlayerModel = mongoose.models.Player || mongoose.model<Player>('Player', PlayerSchema)
export default PlayerModel
