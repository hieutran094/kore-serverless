import BaseController from './base.controller'
import { BookingDetailModel } from '../models/index'
import BookingDetailService from '../services/bookingDetail.service'

export default class BookingDetailController extends BaseController<BookingDetailModel> {
    constructor(protected service: BookingDetailService) {
        super(service)
    }
}
