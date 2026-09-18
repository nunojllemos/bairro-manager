import connectDB from '@/lib/db'
import CoachModel from '@/models/coaches'
import { Coach } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectDB()

        const coaches: Coach[] = await CoachModel.find({}).sort({ name: 1 })

        if (coaches) return NextResponse.json({ coaches }, { status: 200 })

        return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(data: NextRequest) {
    try {
        const coachData = await data.json()

        await connectDB()
        const initialFines = {
            total: 0,
            paid: 0,
        }
        const coach = await CoachModel.create({ ...coachData, fines: initialFines })

        return NextResponse.json({ coach }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(data: NextRequest) {
    try {
        const coachData = await data.json()
        const _id = coachData._id

        await connectDB()
        const coach = await CoachModel.deleteOne({ _id })

        return NextResponse.json({ coach }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB()

        const { _id, name, dob } = await request.json()

        if (!_id) {
            return NextResponse.json({ message: 'Bad request' }, { status: 400 })
        }

        const update: Partial<Coach> = {}

        if (name !== undefined) update.name = name
        if (dob !== undefined) update.dob = dob

        const coach: Coach | null = await CoachModel.findOneAndUpdate({ _id }, update, { new: true })

        if (!coach) {
            return NextResponse.json({ message: 'Coach not found' }, { status: 404 })
        }

        return NextResponse.json({ coach }, { status: 200, headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
        console.log(error)
    }
}
