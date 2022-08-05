import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import ResponseError from '../utils/responseError'

export default class BaseService<T> {
    constructor(protected db: DocumentClient, protected tableName: string) {}

    async getOne(id: string): Promise<T> {
        const params = { TableName: this.tableName, Key: { id } }
        const data = await this.db.get(params).promise()
        if (!data.Item) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found with id: ${id}`
            })
        }
        return data.Item as T
    }

    async getMany(): Promise<T[]> {
        const params = { TableName: this.tableName }
        const data = await this.db.scan(params).promise()
        if (data.Items?.length === 0) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found`
            })
        }
        return data.Items as T[]
    }

    async createOne(dto: T): Promise<T> {
        const params = {
            TableName: this.tableName,
            ConditionExpression: 'attribute_not_exists(id)',
            Item: {
                ...dto,
                id: uuidv4(),
                createdAt: moment().utc().toISOString()
            }
        }
        await this.db.put(params).promise()
        return params.Item as T
    }

    async updateOne(id: string, dto: T): Promise<T> {
        try {
            await this.db
                .update({
                    TableName: this.tableName,
                    Key: { id },
                    ...this.generateUpdateQuery(dto),
                    ReturnValues: 'ALL_NEW'
                })
                .promise()
            return dto as T
        } catch (err) {
            if ((err as any).code === 'ConditionalCheckFailedException') {
                throw new ResponseError({
                    statusCode: 404,
                    message: `An item could not be found with id: ${id}`
                })
            }
            throw err
        }
    }

    protected generateUpdateQuery(fields: T) {
        let exp: any = {
            UpdateExpression: 'set',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {}
        }
        Object.entries(fields).forEach(([key, item]) => {
            exp.UpdateExpression += ` #${key} = :${key},`
            exp.ExpressionAttributeNames[`#${key}`] = key
            exp.ExpressionAttributeValues[`:${key}`] = item
        })
        exp.UpdateExpression = exp.UpdateExpression.slice(0, -1)
        return exp
    }
}
