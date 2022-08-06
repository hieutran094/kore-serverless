import { Request, Response, NextFunction } from 'express'
import { Body } from '../interfaces/jwtBody'
import generateToken from '../utils/jwtGenerate'

export default class AuthController {
    constructor() {}
    async getToken(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Body = {
                sub: req.body.identity,
                iss: req.body.clientId,
                algorithm: 'HS256'
            }
            const token = await generateToken(
                data,
                process.env.CLIENT_SECRET || ''
            )
            res.status(200).json({ jwt: token })
        } catch (err) {
            next(err)
        }
    }
}
