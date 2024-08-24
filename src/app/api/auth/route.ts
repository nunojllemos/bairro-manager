import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/user'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body

        await dbConnect()

        const user = await User.findOne({ username: username })

        if (!user) {
            return NextResponse.json(
                { message: 'Username incorreto', status: 401 },
                { status: 401 }
            )
        }

        if (password === user.password) {
            const userData = {
                username: user.username,
                role: user.role,
                sessionId: user.session_id,
            }

            return NextResponse.json(
                { user: user, status: 307 },
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
