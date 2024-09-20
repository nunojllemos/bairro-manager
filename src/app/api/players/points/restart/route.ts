import PlayerModel from '@/models/player'
import { Player } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const update = {
            'points.month': 0,
        }
        const options = { new: true }

        const updatedPlayers = await PlayerModel.updateMany({}, update, options)
        const players = await PlayerModel.find({})

        console.log(updatedPlayers)

        return NextResponse.json({ message: 'Points reset', players }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
