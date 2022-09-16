import 'dotenv/config'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from './routers/v1/index'
import errorHandler from './middlewares/errorHandler'

//async function main(): Express {
const expressApp: Express = express()
expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(bodyParser.json())
expressApp.use(cors())
expressApp.use(routers)
expressApp.use(errorHandler)
//return expressApp
//}

export const app = expressApp
