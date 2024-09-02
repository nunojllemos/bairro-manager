import { Coach } from '@/types'
import mongoose, { Schema } from 'mongoose'

const coachSchema: Schema = new mongoose.Schema(
    {
        name: { type: String },
        role: { type: String },
        dob: { type: String },
        avatar: { type: String },
        fines: {
            total: { type: Number },
            paid: { type: Number },
            details: [
                {
                    value: { type: Number },
                    _id: { type: String },
                },
            ],
        },
    },
    {
        collection: 'coaches',
        timestamps: true,
    }
)

const CoachModel = mongoose.models.CoachModel || mongoose.model<Coach>('Coach', coachSchema)

export default CoachModel
