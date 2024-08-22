import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/user'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body
        console.log(username, password)

        await dbConnect()

        const user = await User.findOne({ username: username })
        console.log(user)

        if (!user) {
            return NextResponse.json(
                { message: 'Username incorreto', status: 401 },
                { status: 401 }
            )
        }

        if (password === user.password) {
            const token = jwt.sign(
                { userId: user._id.toHexString() },
                process.env.NEXT_PUBLIC_JWT_SECRET as string,
                {
                    expiresIn: '1m',
                }
            )

            return NextResponse.json(
                { role: user.role, token, status: 307 },
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
