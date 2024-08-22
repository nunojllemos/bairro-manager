// import mongoose from 'mongoose'

// const connection: { isConnected?: number } = {}

// async function dbConnect() {
//     if (connection.isConnected) return

//     const db = await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL!, {
//         dbName: 'bairro-manager',
//     })

//     connection.isConnected = db.connections[0].readyState
// }

// export default dbConnect

import mongoose from 'mongoose'

const { NEXT_PUBLIC_DATABASE_URL } = process.env

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            NEXT_PUBLIC_DATABASE_URL as string
        )
        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

export default connectDB
