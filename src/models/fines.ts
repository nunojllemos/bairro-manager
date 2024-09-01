import mongoose, { Document, Schema } from 'mongoose'

export interface IFines extends Document {
    name: string
    description: string
    value?: number
    values?: number[]
}

const finesSchema: Schema = new mongoose.Schema(
    {
        name: { type: String },
        value: { type: Number },
        values: { type: Object },
        description: { type: String },
    },
    {
        collection: 'fines',
    }
)

const FinesModel = mongoose.models.Fines || mongoose.model<IFines>('Fines', finesSchema)

export default FinesModel
