// import mongoose, { Document, Model, Schema } from 'mongoose'

// export interface IPlayer extends Document {
//     name: string
//     number: number
//     createdAt: Date
//     updatedAt: Date
// }

// const playerSchema: Schema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         number: {
//             type: Number,
//             required: true,
//         },
//         fines: [
//             {
//                 total: {
//                     type: Number,
//                 },
//                 paid: {
//                     type: Number,
//                 },
//                 details: [
//                     {
//                         _id: {
//                             type: String,
//                         },
//                         value: {
//                             type: String,
//                         },
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         timestamps: true,
//         collection: 'players',
//     }
// )

// const Player = mongoose.models.Player || mongoose.model<IPlayer>('Player', playerSchema)

// export default Player

import mongoose, { Schema, Document } from 'mongoose'

// Interface for the document structure
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
    points: number
    positions: string[]
    updatedAt: Date
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
        avatar: { type: String, required: true },
        assists: { type: Number, required: true },
        cards: {
            yellow: { type: Number, required: true },
            red: { type: Number, required: true },
        },
        dob: { type: String, required: true },
        goals: { type: Number, required: true },
        is_captain: { type: Boolean, required: true },
        points: { type: Number, required: true },
        positions: { type: [String], required: true },
        updatedAt: { type: Date, required: true },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
)

// Create and export the model
const PlayerModel = mongoose.models.Player || mongoose.model<Player>('Player', PlayerSchema)
export default PlayerModel
