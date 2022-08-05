import BaseModel from './base.model'

export default interface BookingDetailModel extends BaseModel {
    name: string
    email: string
    phoneNumber: string
    bookingDate: Date
    bookingType: boolean
    location: string
    cabType: string
    isCancel: boolean
}
