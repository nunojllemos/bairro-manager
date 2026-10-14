import { NextRequest, NextResponse } from 'next/server'
import connectDb from '@/lib/db'
import GameModel from '@/models/games'
import { Game, Player } from '@/types'
import mongoose from 'mongoose'

export async function GET() {
    await connectDb()

    const games = await GameModel.find({}).sort({ 'date.date': 1 })

    return NextResponse.json({ games }, { status: 200 })
}

export async function POST(data: NextRequest) {
    try {
        const gameDetails = await data.json()

        await connectDb()

        const game = await GameModel.create(gameDetails)
        const games = await GameModel.find({})

        return NextResponse.json({ games }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(data: NextRequest) {
    try {
        const { gameId, all } = await data.json()

        await connectDb()

        if (all) {
            const games = await GameModel.deleteMany({})

            return NextResponse.json({ message: 'OK', games }, { status: 200 })
        }

        const game = await GameModel.deleteOne({ _id: gameId })

        return NextResponse.json({ message: 'OK', game }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(data: NextRequest) {
    try {
        const gameDetails = await data.json()

        const { gameId, teams, date, weather, final_result, half_time_result, pre_game, pos_game } = await gameDetails

        await connectDb()

        const filter = { _id: gameId }
        const update = {
            teams: teams,
            date: date,
            weather: weather,
            final_result: final_result,
            half_time_result: half_time_result,
            pre_game: pre_game,
            pos_game: pos_game,
        }
        const options = { new: true }

        const updatedGame: Game | null = await GameModel.findOneAndUpdate(filter, update, options)

        if (!updatedGame) return NextResponse.json({ message: 'Game not found' }, { status: 404 })

        return NextResponse.json({ message: 'OK', game: updatedGame }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
