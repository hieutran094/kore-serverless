import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import BaseService from './base.service'
import { BookingDetailModel } from '../models/index'

export default class BookingDetailService extends BaseService<BookingDetailModel> {
    constructor(protected db: DocumentClient) {
        super(db, 'booking_detail')
    }
}
