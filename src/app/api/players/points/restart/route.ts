import connectDB from '@/lib/db'
import PlayerModel from '@/models/player'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
    try {
        await connectDB()

        const update = {
            'points.month': 0,
        }
        const options = { new: true }

        const updatedPlayers = await PlayerModel.updateMany({}, update, options)
        const players = await PlayerModel.find({})

        return NextResponse.json({ message: 'Points reset', players }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
