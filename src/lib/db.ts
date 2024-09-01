import mongoose from 'mongoose'

const { NEXT_PUBLIC_DATABASE_URL, MONGODB_URI } = process.env

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    dbName: 'bairro-manager',
}

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            (MONGODB_URI as string) ||
                'mongodb+srv://nunojllemos:o9aIP4beabev93rZ@bairro-manager.jz6r4.mongodb.net/?retryWrites=true&w=majority&appName=bairro-manager',
            options
        )
        if (connection.readyState === 1) {
            console.log('🚀 mongodb connected')
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log('INSIDE MONGO DB ERROR')
        console.error(error)
        return Promise.reject(error)
    }
}

export default connectDB
