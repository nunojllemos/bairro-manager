import connectDb from '@/lib/db'
import FinesModel from '@/models/fines'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectDb()

    const fines = await FinesModel.find({})

    return NextResponse.json(fines)
}
