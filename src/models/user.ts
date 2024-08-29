import mongoose, { Document, Schema } from 'mongoose'

export interface User extends Document {
    username: string
    role: 'mister' | 'cap' | 'player'
    password: string
    sessionId: string
}

const userSchema: Schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        sessionId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
)

const User = mongoose.models.User || mongoose.model<User>('User', userSchema)

export default User
