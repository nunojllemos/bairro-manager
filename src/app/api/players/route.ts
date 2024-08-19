import { NextResponse } from 'next/server'
import Player from '@/app/models/player'
import dbConnect from '@/lib/db'

export async function GET() {
    await dbConnect()

    const players = await Player.find({})

    return NextResponse.json(players)
}
