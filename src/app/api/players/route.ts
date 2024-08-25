import { NextRequest, NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import dbConnect from '@/lib/db'

export async function GET() {
    await dbConnect()

    const players = await PlayerModel.find({})

    return NextResponse.json(players)
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { player_id, fines } = data

        await dbConnect()

        const player = await PlayerModel.findById(player_id)

        if (!player) {
            return NextResponse.json({ message: 'Player not found' }, { status: 404 })
        }

        const updatedFinesDetails = [
            ...new Map([...player.fines.details, ...fines].map((item) => [item._id, item])).values(),
        ]

        console.log(updatedFinesDetails)

        const filter = { _id: player_id }
        const update = { 'fines.details': updatedFinesDetails }
        const options = { new: true }

        const updatedUser = await PlayerModel.findOneAndUpdate(filter, update, options)

        return NextResponse.json({ message: 'OK', user: updatedUser }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
