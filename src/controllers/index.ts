import BookingDetailController from './bookingDetail.controller'
import { bookingDetailService } from '../services/index'
import AuthController from './auth.controller'

const bookingDetailController = new BookingDetailController(
    bookingDetailService
)
const authController = new AuthController()

export { bookingDetailController, authController }
