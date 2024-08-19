import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

async function dbConnect() {
    if (connection.isConnected) return

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL!, {
        dbName: 'bairro-manager',
    })

    connection.isConnected = db.connections[0].readyState
}

export default dbConnect
