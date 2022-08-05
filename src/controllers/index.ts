import BookingDetailController from './bookingDetail.controller'
import { bookingDetailService } from '../services/index'

const bookingDetailController = new BookingDetailController(bookingDetailService)

export { bookingDetailController }
