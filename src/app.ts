import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import * as path from 'path'
import getToken from './utils/jwtGenerate'

dotenv.config()

const PROJECT_DIR = path.normalize(__dirname) + '/views'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', express.static(path.join(PROJECT_DIR, '')))
app.post('/token', async (req: Request, res: Response) => {
    const data = {
        sub: req.body.identity,
        iss: req.body.clientId,
        algorithm: 'HS256'
    }
    const token = await getToken(data, process.env.CLIENT_SECRET || '')
    res.json({ jwt: token })
})

export { app }
