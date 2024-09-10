import { NextRequest, NextResponse } from 'next/server'
import connectDb from '@/lib/db'
import GameModel from '@/models/games'

export async function GET() {
    await connectDb()

    const games = await GameModel.find({}).sort({ 'date.date': 1 })

    return NextResponse.json({ games }, { status: 200 })
}

export async function POST(data: NextRequest) {
    try {
        const gameDetails = await data.json()

        console.log(gameDetails)

        await connectDb()

        const game = await GameModel.create(gameDetails)
        const games = await GameModel.find({})

        return NextResponse.json({ games }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
