import PlayerModel from '@/models/player'
import { Player } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()

        if (data) {
            const updatedPlayers = await Promise.all(
                data.map(async (player: Player) => {
                    const { _id, points } = player

                    const filter = { _id }
                    const update = {
                        $inc: { 'points.total': points.month, 'points.month': points.month },
                    }
                    const options = { new: true }

                    const updatedPlayer = await PlayerModel.findByIdAndUpdate(filter, update, options)

                    return updatedPlayer
                })
            )

            return NextResponse.json({ message: 'Players updated', updatedPlayers }, { status: 200 })
        }

        return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    } catch (error) {
        console.log(error)
    }
}
