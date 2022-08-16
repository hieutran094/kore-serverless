import { firestore } from 'firebase-admin'
import BaseService from './base.service'
import { BookingDetailModel } from '../models/index'

export default class BookingDetailService extends BaseService<BookingDetailModel> {
    constructor(protected db: firestore.Firestore) {
        super(db, 'booking_detail')
    }
}
