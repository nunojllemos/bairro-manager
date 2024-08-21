import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
    role: string
    password: string
}

const userSchema: Schema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
