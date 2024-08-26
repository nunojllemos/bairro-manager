import { NextRequest, NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import dbConnect from '@/lib/db'
import Fines, { IFines } from '@/models/fines'
import { Player } from '@/types'

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { player_id, fines } = data

        await dbConnect()

        const player: Player | null = await PlayerModel.findById(player_id)

        if (!player) {
            return NextResponse.json({ message: 'Player not found' }, { status: 404 })
        }

        const updatedFinesDetails = [
            ...new Map([...player.fines.details, ...fines].map((item) => [item._id, item])).values(),
        ]

        const filter = { _id: player_id }
        const update = { 'fines.details': updatedFinesDetails }
        const options = { new: true }

        const finesModel: Partial<IFines>[] | null = await Fines.find({}, ['_id', 'value'], { lean: true })

        console.log(finesModel)

        const totalValue = finesModel.map((fine) => {
            player.fines.details
                .map((playerFine) => {
                    if (playerFine._id === fine._id) {
                        console.log(playerFine.value * (fine.value || 1))
                        return playerFine.value * (fine.value || 1)
                    }

                    return 0
                })
                .reduce((total, currentValue) => total + currentValue)
        })

        console.log(totalValue)

        const updatedUser = await PlayerModel.findOneAndUpdate(filter, update, options)

        return NextResponse.json({ message: 'OK', user: updatedUser }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
