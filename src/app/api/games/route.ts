import connectDb from '@/lib/db'
import GameModel from '@/models/games'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectDb()

    const games = await GameModel.find({}).sort({ 'date.date': 1 })

    return NextResponse.json({ games }, { status: 200 })
}
