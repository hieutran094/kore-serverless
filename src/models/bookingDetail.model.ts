import IBase from './base.interface'
import mongoose, { Schema, Document } from 'mongoose'

export interface IBookingDetail extends Document, IBase {
    name: string
    email: string
    phoneNumber: string
    bookingDate: Date
    bookingType?: boolean
    location?: string
    cabType?: string
    isCancel?: boolean
}

const BookingDetailSchema: Schema = new Schema({
    email: { type: String, required: false, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bookingDate: { type: Date, required: false },
    bookingType: { type: Boolean },
    location: { type: String },
    cabType: { type: String },
    isCancel: { type: Boolean },
    createdAt: { type: String },
    updatedAt: { type: String },
    deleteFlag: { type: Boolean }
})

export default mongoose.model<IBookingDetail>(
    'BookingDetail',
    BookingDetailSchema
)
