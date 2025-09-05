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
        }

        if (defeats) {
            const updatedDefeats = await FinesModel.findOneAndUpdate(
                { name: 'Derrota' },
                { values: defeats },
                { new: true }
            )
        }

        return NextResponse.json({ message: 'Fines updated' }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(data: NextRequest) {
    try {
        const fineData = await data.json()
        console.log('🚀 ~ POST ~ fineData:', fineData)

        await connectDb()
        const fine = await FinesModel.create(fineData)

        return NextResponse.json({ fine }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(data: NextRequest) {
    try {
        const fineData = await data.json()
        const _id = fineData._id

        console.log('🚀 ~ POST ~ fineData:', fineData)

        await connectDb()
        const player = await FinesModel.deleteOne({ _id })

        return NextResponse.json({ player }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
