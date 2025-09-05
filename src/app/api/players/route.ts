import { NextRequest, NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import connectDB from '@/lib/db'

// export const revalidate = 10
export const dynamic = 'force-dynamic'

export async function GET() {
    await connectDB()

    const players = await PlayerModel.find({})

    if (players) return NextResponse.json({ message: 'OK', players }, { status: 200 })

    return NextResponse.json({ message: 'No players' }, { status: 404 })
}

export async function POST(data: NextRequest) {
    try {
        const playerData = await data.json()

        await connectDB()
        const initialFines = {
            total: 0,
            paid: 0,
        }
        const player = await PlayerModel.create({ ...playerData, fines: initialFines })
        console.log('🚀 ~ POST ~ player:', player)

        return NextResponse.json({ player }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(data: NextRequest) {
    try {
        const playerData = await data.json()
        const _id = playerData._id

        console.log('🚀 ~ POST ~ playerData:', playerData)

        await connectDB()
        const player = await PlayerModel.deleteOne({ _id })

        return NextResponse.json({ player }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
