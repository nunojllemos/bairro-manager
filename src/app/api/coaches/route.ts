import connectDB from '@/lib/db'
import CoachModel from '@/models/coaches'
import { Coach } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectDB()

        const coaches: Coach[] = await CoachModel.find({}).sort({ name: 1 })

        console.log(coaches)

        if (coaches) return NextResponse.json({ coaches }, { status: 200 })

        return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    } catch (error) {
        console.log(error)
    }
}
