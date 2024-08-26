import { NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import dbConnect from '@/lib/db'

export async function GET() {
    await dbConnect()

    const players = await PlayerModel.find({})

    return NextResponse.json(players)
}
