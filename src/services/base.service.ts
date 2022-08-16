import { firestore } from 'firebase-admin'
// import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import ResponseError from '../utils/responseError'

export default class BaseService<T> {
    constructor(
        protected db: firestore.Firestore,
        protected tableName: string
    ) {}

    async getOne(id: string): Promise<T> {
        const data = await this.db
            .collection(this.tableName)
            .where('id', '==', id)
            .where('deleteFlag', '==', false)
            .get()

        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found with id: ${id}`
            })
        }
        return data.docs[0].data() as T
    }

    async getMany(): Promise<T[]> {
        const data = await this.db
            .collection(this.tableName)
            .where('deleteFlag', '==', false)
            .get()
        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found`
            })
        }
        const allEntries: T[] = []
        data.forEach((doc: any) => allEntries.push(doc.data()))
        return allEntries
    }

    async createOne(dto: T): Promise<T> {
        const now = moment().utc().toISOString()
        const entry: T = {
            ...dto,
            id: await this.generateId(),
            createdAt: now,
            updatedAt: now,
            deleteFlag: false
        }
        await this.db.collection(this.tableName).add(entry)
        return entry
    }

    async updateOne(id: string, dto: T): Promise<T> {
        try {
            const now = moment().utc().toISOString()
            const data = await this.db
                .collection(this.tableName)
                .where('id', '==', id)
                .where('deleteFlag', '==', false)
                .get()
            if (data.empty) {
                throw new ResponseError({
                    statusCode: 404,
                    message: `An item could not be found with id: ${id}`
                })
            }
            await this.db
                .collection(this.tableName)
                .doc(data.docs[0].id)
                .set({ ...dto, updatedAt: now }, { merge: true })
            return dto as T
        } catch (err) {
            throw err
        }
    }

    async softDeleteOne(id: string): Promise<void> {
        try {
            const now = moment().utc().toISOString()
            const data = await this.db
                .collection(this.tableName)
                .where('id', '==', id)
                .where('deleteFlag', '==', false)
                .get()
            if (data.empty) {
                throw new ResponseError({
                    statusCode: 404,
                    message: `An item could not be found with id: ${id}`
                })
            }
            await this.db
                .collection(this.tableName)
                .doc(data.docs[0].id)
                .set({ deleteFlag: true, updatedAt: now }, { merge: true })
        } catch (err) {
            throw err
        }
    }

    async deleteOne(id: string): Promise<void> {
        const data = await this.db
            .collection(this.tableName)
            .where('id', '==', id)
            .where('deleteFlag', '==', false)
            .get()
        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found with id: ${id}`
            })
        }
        await this.db.collection(this.tableName).doc(data.docs[0].id).delete()
    }

    protected async generateId(): Promise<string> {
        const data = await this.db.collection(this.tableName).where('deleteFlag', '==', false).get()
        return `ID${data.size || 0 + 1}`
    }
}
