import jwt from 'jsonwebtoken'

export default async (body: any, secret: string) =>
    await jwt.sign(body, secret, { algorithm: 'HS256' })
