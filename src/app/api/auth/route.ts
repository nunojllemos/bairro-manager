import dbConnect from '@/lib/db'
import User from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body

        await dbConnect()

        const user = await User.findOne({ role: username })

        if (!user) {
            return NextResponse.json(
                { message: 'Username incorreto', status: 401 },
                { status: 401 }
            )
        }

        if (password === user.password) {
            return NextResponse.json(
                { role: user.role, status: 307, message: 'Redirect' },
                { status: 307 }
            )
        }

        return NextResponse.json(
            { message: 'Password incorreta', status: 401 },
            { status: 401 }
        )
    } catch (error) {
        console.log(error)
        // return NextResponse.error
    }
}
