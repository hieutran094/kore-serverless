import { BookingDetailModel } from '../models/index'
import BookingDetailService from './bookingDetail.service'

const bookingDetailService = new BookingDetailService(BookingDetailModel)
export { bookingDetailService }
