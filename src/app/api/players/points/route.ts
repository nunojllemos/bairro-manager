import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        console.log(data)

        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}
