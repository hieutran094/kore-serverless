import { Request, Response, NextFunction } from 'express'
import BaseService from '../services/base.service'

export default class BaseController<T> {
    constructor(protected service: BaseService<T>) {}

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await this.service.getOne(id)
            res.status(200).send({
                code: 200,
                success: true,
                data,
                message: ''
            })
        } catch (err) {
            next(err)
        }
    }
    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const data = await this.service.createOne(body)
            res.status(200).send({
                code: 201,
                success: true,
                data,
                message: 'Created'
            })
        } catch (err) {
            next(err)
        }
    }
    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const body = req.body
            const data = await this.service.updateOne(id, body)
            res.status(200).send({
                code: 200,
                success: true,
                data,
                message: 'Updated'
            })
        } catch (err) {
            next(err)
        }
    }
}
