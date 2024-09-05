import { NextResponse } from 'next/server'
import PlayerModel from '@/models/player'
import connectDB from '@/lib/db'

// export const revalidate = 30

export async function GET() {
    await connectDB()

    const players = await PlayerModel.find({})

    if (players) return NextResponse.json({ message: 'OK', players }, { status: 200 })

    return NextResponse.json({ message: 'No players' }, { status: 404 })
}
