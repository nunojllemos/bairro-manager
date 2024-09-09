import { NextRequest, NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import connectDB from '@/lib/db'
import Fines, { IFines } from '@/models/fines'
import { Coach, Player } from '@/types'
import CoachModel from '@/models/coaches'

export async function PATCH(request: NextRequest) {
    try {
        await connectDB()

        const data = await request.json()
        const { person_id, fines, paid } = data

        const coach: Coach | null = await CoachModel.findById(person_id)

        if (!coach) {
            return NextResponse.json({ message: 'Coach not found' }, { status: 404 })
        }

        const updatedFinesDetails = [
            ...new Map([...coach.fines.details, ...fines].map((item) => [item._id, item])).values(),
        ]

        const filter = { _id: person_id }
        const update = { 'fines.details': updatedFinesDetails, 'fines.paid': paid || coach.fines.paid }
        const options = { new: true }

        const updatedUser: Coach | null = await CoachModel.findOneAndUpdate(filter, update, options)

        console.log('updatedFinesDetails', updatedFinesDetails)

        if (fines.length) {
            const finesData: Partial<IFines>[] | null = await Fines.find({}, ['_id', 'value'], { lean: true })

            const totalValue = finesData
                .map((fine) => {
                    const total = updatedUser?.fines.details
                        .map((coachFine) => {
                            if (coachFine._id === (fine._id as any).toHexString()) {
                                if (fine.value) {
                                    return +coachFine.value * fine.value
                                }
                                return 0
                            }
                            return 0
                        })
                        .reduce((total, currentValue) => total + currentValue)

                    return total
                })
                .reduce((total, current) => (total as number) + (current as number))

            const updatedUserTotal: Coach | null = await CoachModel.findOneAndUpdate(
                filter,
                { 'fines.total': totalValue },
                options
            )

            return NextResponse.json(
                { coach: updatedUserTotal },
                { status: 200, headers: { 'Cache-Control': 'no-store' } }
            )
        }

        return NextResponse.json({ coach: updatedUser }, { status: 200, headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
        console.log(error)
    }
}
