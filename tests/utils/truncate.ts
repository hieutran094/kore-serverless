import { Model } from 'mongoose'

export default async <T>(schema: Model<T>) => {
    return await schema.deleteMany({})
}
