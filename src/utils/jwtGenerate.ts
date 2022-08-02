import jwt from 'jsonwebtoken'
import { Body } from '../interfaces/jwtBody'
export default async (body: Body, secret: string) =>
    await jwt.sign(body, secret, { algorithm: 'HS256' })
