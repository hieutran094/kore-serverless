import request from 'supertest'
import { app } from '../src/app'
import truncate from './utils/truncate'
import database from '../src/database/index'
import { BookingDetailModel } from '../src/models'

describe('/booking', () => {
    let tableName: string = 'booking_detail'
    let stubData: BookingDetailModel[]

    beforeEach(async () => {
        stubData = (await database.scan({ TableName: tableName }).promise())
            .Items as BookingDetailModel[]
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

    it('[GET] should get one booking with data', async () => {
        const res = await request(app)
            .get(`/api/v1/booking/${stubData[0].id}`)
            .send()
        expect(res.body.success).toBeTruthy()
        expect(res.body.data).toStrictEqual(stubData[0])
    })

    it('[PUT] should update booking', async () => {
        const data = { name: 'name02' }
        const res = await request(app)
            .put(`/api/v1/booking/${stubData[0].id}`)
            .send(data)
        expect(res.body.success).toBeTruthy()
        expect(res.body.data.name).toBe('name02')
    })

    it('[DELETE] should delete booking', async () => {
        const res = await request(app)
            .delete(`/api/v1/booking/${stubData[0].id}`)
            .send()
        expect(res.body.success).toBeTruthy()
        const afterData = (
            await database.scan({ TableName: tableName }).promise()
        ).Items as BookingDetailModel[]
        expect(afterData.length).toBe(0)
    })
    
    afterAll(async () => {
        /** be sure to use the right DB */
        await truncate(database, tableName)
    })
})
