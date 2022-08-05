import { Router } from 'express'
import { bookingDetailController } from '../../controllers/index'

const router = Router()

router
    .route('/booking')
    .get(bookingDetailController.getOne)
    .post(bookingDetailController.createOne)
    .put(bookingDetailController.updateOne)

export default router
