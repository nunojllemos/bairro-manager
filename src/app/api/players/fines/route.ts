import { NextRequest, NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import dbConnect from '@/lib/db'
import Fines, { IFines } from '@/models/fines'
import { Player } from '@/types'

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { player_id, fines, paid } = data

        await dbConnect()

        const player: Player | null = await PlayerModel.findById(player_id)

        if (!player) {
            return NextResponse.json({ message: 'Player not found' }, { status: 404 })
        }

        const updatedFinesDetails = [
            ...new Map([...player.fines.details, ...fines].map((item) => [item._id, item])).values(),
        ]

        const filter = { _id: player_id }
        const update = { 'fines.details': updatedFinesDetails, 'fines.paid': paid }
        const options = { new: true }

        const finesData: Partial<IFines>[] | null = await Fines.find({}, ['_id', 'value'], { lean: true })

        const updatedUser: Player | null = await PlayerModel.findOneAndUpdate(filter, update, options)

        const totalValue = finesData
            .map((fine) => {
                const { _id, value } = fine

                const total = updatedUser?.fines.details
                    .map((playerFine) => {
                        if (playerFine._id === (_id as any).toHexString()) {
                            return playerFine.value * (value || 1)
                        }

                        return 0
                    })
                    .reduce((total, currentValue) => total + currentValue)

                return total
            })
            .reduce((total, current) => (total as number) + (current as number))

        const updatedUserTotal: Player | null = await PlayerModel.findOneAndUpdate(
            filter,
            { 'fines.total': totalValue },
            options
        )

        return NextResponse.json({ message: 'OK', user: updatedUserTotal }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
