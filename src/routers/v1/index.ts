import express, { Express } from 'express'
import BookingDetailRouter from './bookingDetail.router'

export default (app: Express) => {
    const routers = express.Router()
    routers.use(BookingDetailRouter)
    app.use('/api/v1/', routers)
    return app
}
