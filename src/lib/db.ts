import mongoose from 'mongoose'

const { NEXT_PUBLIC_DATABASE_URL } = process.env

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            NEXT_PUBLIC_DATABASE_URL as string,
            { dbName: 'bairro-manager' }
        )
        if (connection.readyState === 1) {
            console.log('🚀 mongodb connected')
            return Promise.resolve(true)
        }
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

export default connectDB
