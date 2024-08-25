import { NextRequest, NextResponse } from 'next/server'
import Player from '@/models/player'
import dbConnect from '@/lib/db'

export async function GET() {
    await dbConnect()

    const players = await Player.find({})

    return NextResponse.json(players)
}

export async function PATCH(request: NextRequest) {
    const data = await request.json()
    console.log(data)

    return NextResponse.json({ message: 'OK' })
}
