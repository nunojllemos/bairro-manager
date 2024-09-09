import { Coach } from '@/types'
import { Schema, models, model } from 'mongoose'

const CoachSchema: Schema = new Schema(
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

const CoachModel = models.Coach || model<Coach>('Coach', CoachSchema)

export default CoachModel
