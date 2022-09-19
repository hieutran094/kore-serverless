import { connect, Mongoose } from 'mongoose'

export default async (db: string): Promise<Mongoose | undefined> => {
    try {
        return await connect(db)
    } catch (error) {
        console.error('Error connecting to database: ', error)
    }
}
