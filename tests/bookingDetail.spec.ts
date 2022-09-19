import request from 'supertest'
import { Mongoose } from 'mongoose'
import { app } from '../src/app'
import truncate from './utils/truncate'
import initDatabase from '../src/database/index'
import BookingDetailModel, {
    IBookingDetail
} from '../src/models/bookingDetail.model'

describe('/booking', () => {
    let db: Mongoose | undefined
    let stubData: IBookingDetail[]

    beforeAll(async () => {
        const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
        db = await initDatabase(dbUrl)
    })

    beforeEach(async () => {
        stubData = await BookingDetailModel.find({}).exec()
    })

    it('[POST] should create booking', async () => {
        const data = {
            name: 'name',
            email: 'name@example.com',
            phoneNumber: '0987654321',
            bookingDate: '2022/08/11',
            bookingType: false,
            location: 'Tokyo',
            cabType: 'Honda',
            isCancel: false
        }
        const res = await request(app).post('/api/v1/booking').send(data)
        expect(res.body.success).toBeTruthy()
    })

    it('[GET][GetMany] should get many booking with data', async () => {
        const res = await request(app).get(`/api/v1/booking/`).send()
        expect(res.body.success).toBeTruthy()
        expect(res.body.data.length).toBe(stubData.length)
    })

    it('[GET][GetOne] should get one booking with data', async () => {
        const res = await request(app)
            .get(`/api/v1/booking/${stubData[0]._id}`)
            .send()
        expect(res.body.success).toBeTruthy()
        expect(res.body.data).toStrictEqual(
            JSON.parse(JSON.stringify(stubData[0]))
        )
    })

    it('[PUT] should update booking', async () => {
        const data = { name: 'name02' }
        const res = await request(app)
            .put(`/api/v1/booking/${stubData[0]._id}`)
            .send(data)
        expect(res.body.success).toBeTruthy()
        expect(res.body.data.name).toBe('name02')
    })

    it('[DELETE][SoftDelete] should softdelete booking', async () => {
        const res = await request(app)
            .delete(`/api/v1/booking/${stubData[0]._id}/soft-delete`)
            .send()
        expect(res.body.success).toBeTruthy()
        const afterData = await BookingDetailModel.find({
            deleteFlag: false
        }).exec()
        expect(afterData.length).toBe(0)
    })

    it('[DELETE][HardDelete] should delete booking', async () => {
        const res = await request(app)
            .delete(`/api/v1/booking/${stubData[0]._id}`)
            .send()
        expect(res.body.success).toBeTruthy()
        const afterData = await BookingDetailModel.find({}).exec()
        expect(afterData.length).toBe(0)
    })

    afterAll(async () => {
        /** be sure to use the right DB */
        await truncate(BookingDetailModel)
        if (db instanceof Mongoose) db.disconnect()
    })
})
