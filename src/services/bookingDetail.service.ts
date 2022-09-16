import { Model } from 'mongoose'
import BaseService from './base.service'
import { IBookingDetail } from '../models/bookingDetail.model'

export default class BookingDetailService extends BaseService<IBookingDetail> {
    constructor(protected BookingDetailModel: Model<IBookingDetail>) {
        super(BookingDetailModel)
    }
}
