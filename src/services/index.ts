import databaseInstance from '../database/index'
import BookingDetailService from './bookingDetail.service'

const bookingDetailService = new BookingDetailService(databaseInstance)
export { bookingDetailService }
