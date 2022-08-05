import BaseController from './base.controller'
import { BookingDetailModel } from '../models/index'
import BaseService from '../services/base.service'

export default class BookingDetailController extends BaseController<BookingDetailModel> {
    constructor(protected service: BaseService<BookingDetailModel>) {
        super(service)
    }
}
