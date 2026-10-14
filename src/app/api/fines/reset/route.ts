import connectDB from '@/lib/db'
import PlayerModel from '@/models/player'
import CoachModel from '@/models/coaches'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        await connectDB()

        const resetFines = { total: 0, paid: 0, details: [] }
        const options = { new: true }

        await PlayerModel.updateMany({}, { $set: { fines: resetFines } }, options)
        await CoachModel.updateMany({}, { $set: { fines: resetFines } }, options)

        return NextResponse.json({ message: 'Fines reset' }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
