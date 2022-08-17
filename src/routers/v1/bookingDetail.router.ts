import { Router } from 'express'
import { bookingDetailController } from '../../controllers/index'

const router = Router()

router
    .route('/booking')
    .get(bookingDetailController.getMany.bind(bookingDetailController))
    .post(bookingDetailController.createOne.bind(bookingDetailController))

router
    .route('/booking/search')
    .get(bookingDetailController.search.bind(bookingDetailController))

router
    .route('/booking/:id/soft-delete')
    .delete(bookingDetailController.softDeleteOne.bind(bookingDetailController))

router
    .route('/booking/:id')
    .get(bookingDetailController.getOne.bind(bookingDetailController))
    .put(bookingDetailController.updateOne.bind(bookingDetailController))
    .delete(bookingDetailController.deleteOne.bind(bookingDetailController))

export default router
