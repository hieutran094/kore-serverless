import { connect } from 'mongoose'

export default async (db: string) => {
    try {
        await connect(db)
    } catch (error) {
        console.error('Error connecting to database: ', error)
    }
}
