import { Request } from 'express'
import moment from 'moment'
import mongoose, { Model } from 'mongoose'
import ResponseError from '../utils/responseError'

export default class BaseService<T> {
    constructor(protected repo: Model<T>) {}

    async getOne(id: string): Promise<T> {
        const data = await this.repo
            .findOne({
                _id: new mongoose.Types.ObjectId(id),
                deleteFlag: false
            })
            .exec()
        return data as T
    }

    async search(req: Request): Promise<T[]> {
        const { phoneNumber } = req.query
        const data = await this.repo
            .find({ phoneNumber, deleteFlag: false })
            .exec()
        return data as T[]
    }

    async getMany(): Promise<T[]> {
        const data = await this.repo.find({ deleteFlag: false }).exec()
        return data as T[]
    }

    async createOne(dto: T): Promise<T> {
        const now = moment().utc().toISOString()
        const data = await this.repo.create({
            ...dto,
            createdAt: now,
            updatedAt: now,
            deleteFlag: false
        })
        return data as T
    }

    async updateOne(id: string, dto: T): Promise<T | null> {
        try {
            const now = moment().utc().toISOString()
            const data = await this.repo.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id), deleteFlag: false },
                {
                    $set: {
                        ...dto,
                        updatedAt: now
                    }
                },
                {
                    returnDocument: 'after'
                }
            )
            return data
        } catch (err) {
            throw err
        }
    }

    async softDeleteOne(id: string): Promise<void> {
        try {
            const now = moment().utc().toISOString()
            await this.repo.updateOne(
                { _id: new mongoose.Types.ObjectId(id) },
                {
                    updatedAt: now,
                    deleteFlag: true
                }
            )
        } catch (err) {
            throw err
        }
    }

    async deleteOne(id: string): Promise<void> {
        await this.repo.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    }
}
