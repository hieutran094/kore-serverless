import request from 'supertest'
import { app } from '../src/app'
describe('/', () => {
    it('[GET] should return Server is running', async () => {
        const res = await request(app).get('/').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toStrictEqual({ data: 'Server is running' })
    })
    it('[POST] should return data with the same data post', async () => {
        const res = await request(app).post('/').send({
            name: 'e2e testcase'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toStrictEqual({
            data: { name: 'e2e testcase' }
        })
    })
})
