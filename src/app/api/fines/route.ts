import connectDb from '@/lib/db'
import Fines from '@/models/fines'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectDb()

    const fines = await Fines.find({})

    return NextResponse.json(fines)
}
