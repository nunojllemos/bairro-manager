import mongoose, { Schema, Document } from 'mongoose'

export type EventType = 'other' | 'game' | 'session' | 'anniversary'

export interface Event extends Document {
    _id: string
    title: string
    date: string
    start: string
    end: string
    type: EventType
}

const EventSchema: Schema = new Schema(
    {
        title: { type: String },
        date: { type: String },
        start: { type: String },
        end: { type: String },
        type: { type: String },
    },
    { collection: 'team-events' }
)

const EventModel = mongoose.models.Event || mongoose.model<any>('Event', EventSchema)
export default EventModel
