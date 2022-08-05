import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import getToken from './utils/jwtGenerate'
import { Body } from './interfaces/jwtBody'
import { bookingDetailService } from './services/index'
import { BookingDetailModel } from './models/index'
import routers from './routers/v1/index'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/token', async (req: Request, res: Response) => {
    const data: Body = {
        sub: req.body.identity,
        iss: req.body.clientId,
        algorithm: 'HS256'
    }
    const token = await getToken(data, process.env.CLIENT_SECRET || '')
    res.json({ jwt: token })
})

app.get('/booking', async (req: Request, res: Response) => {
    const data = await bookingDetailService.getMany()
    res.json(data)
})
app.get('/booking/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const data = await bookingDetailService.getOne(id)
    res.json(data)
})

app.post('/booking', async (req: Request, res: Response) => {
    const dto: BookingDetailModel = req.body
    const data = await bookingDetailService.createOne(dto)
    res.json(data)
})

app.put('/booking/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const dto: BookingDetailModel = req.body
    const data = await bookingDetailService.updateOne(id, dto)
    res.json(data)
})

export { app }
