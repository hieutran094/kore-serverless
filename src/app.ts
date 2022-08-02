import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

const PROJECT_DIR = path.normalize(__dirname) + '/views'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', express.static(path.join(PROJECT_DIR, '')))
app.post('/', (req: Request, res: Response) => {
    const data = req.body
    res.json({ data })
})

export { app }
