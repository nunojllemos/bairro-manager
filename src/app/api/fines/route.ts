import connectDb from '@/lib/db'
import FinesModel from '@/models/fines'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    await connectDb()

    const fines = await FinesModel.find({})

    return NextResponse.json(fines)
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDb()

        const { victories, defeats } = await request.json()

        if (victories) {
            const updatedVictories = await FinesModel.findOneAndUpdate(
                { name: 'Vitória' },
                { values: victories },
                { new: true }
            )
            console.log(updatedVictories)
        }

        if (defeats) {
            const updatedDefeats = await FinesModel.findOneAndUpdate(
                { name: 'Derrota' },
                { values: defeats },
                { new: true }
            )
            console.log(updatedDefeats)
        }

        return NextResponse.json({ message: 'Fines updated' }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
