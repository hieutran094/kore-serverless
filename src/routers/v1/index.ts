import { Router } from 'express'
import bookingDetailRouter from './bookingDetail.router'
import authRouter from './auth.router'

const routers = Router()
routers.use('/api/v1/', bookingDetailRouter)
routers.use('/api/v1/', authRouter)

export default routers
