import { Request, Response, NextFunction } from 'express'
import BaseService from '../services/base.service'

export default class BaseController<T> {
    constructor(protected service: BaseService<T>) {}

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await this.service.getOne(id)
            this.toJsonResponse(res, 200, data)
        } catch (err) {
            next(err)
        }
    }
    async getMany(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.getMany()
            this.toJsonResponse(res, 200, data)
        } catch (err) {
            next(err)
        }
    }
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.search(req)
            this.toJsonResponse(res, 200, data)
        } catch (err) {
            next(err)
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const data = await this.service.createOne(body)
            this.toJsonResponse(res, 201, data, 'Create successfully')
        } catch (err) {
            next(err)
        }
    }
    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const body = req.body
            if (body.deleteFlag !== undefined) {
                body.deleteFlag = JSON.parse(body.deleteFlag)
            }

            const data = await this.service.updateOne(id, body)
            this.toJsonResponse(res, 200, data, 'Update successfully')
        } catch (err) {
            next(err)
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.service.deleteOne(id)
            this.toJsonResponse(
                res,
                200,
                null,
                'Permanently delete successfully'
            )
        } catch (err) {
            next(err)
        }
    }

    async softDeleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.service.softDeleteOne(id)
            this.toJsonResponse(res, 200, null, 'Delete successfully')
        } catch (err) {
            next(err)
        }
    }

    protected toJsonResponse(
        res: Response,
        code: number,
        data: T | T[] | null,
        message: string = ''
    ) {
        res.status(code).send({ code, success: true, data, message })
    }
}
