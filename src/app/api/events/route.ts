import connectDB from '@/lib/db'
import EventModel, { Event } from '@/models/events'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectDB()

        const events = await EventModel.find({}).sort({ date: 1, start: 1 })

        if (events) return NextResponse.json({ message: 'OK', events }, { status: 200 })

        return NextResponse.json({ message: 'No events' }, { status: 404 })
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const events: Event[] = await data.data

        if (!events) return NextResponse.json({ message: 'Bad request. No data.' }, { status: 400 })

        const updatedEvents = await Promise.all(
            events.map(async (event) => {
                const filter = { _id: event._id }
                const update = { ...event }
                const options = { new: true }

                const updatedEvent = await EventModel.findOneAndUpdate(filter, update, options)

                return updatedEvent
            })
        )

        const allEvents = await EventModel.find({}).sort({ date: 1, start: 1 })

        return NextResponse.json({ message: 'OK', events: allEvents }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
function connectDb() {
    throw new Error('Function not implemented.')
}
