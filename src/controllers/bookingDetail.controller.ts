import BaseController from './base.controller'
import { IBookingDetail } from '../models/bookingDetail.model'
import BookingDetailService from '../services/bookingDetail.service'

export default class BookingDetailController extends BaseController<IBookingDetail> {
    constructor(protected service: BookingDetailService) {
        super(service)
    }
}
