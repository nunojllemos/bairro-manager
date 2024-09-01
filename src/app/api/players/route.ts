import { NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import connectDB from '@/lib/db'

export async function GET() {
    await connectDB()

    const players = await PlayerModel.find({})

    return NextResponse.json(players)
}
