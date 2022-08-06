import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export default async (db: DocumentClient, tableName: string) => {
    const rows = await db
        .scan({
            TableName: tableName,
            AttributesToGet: ['id']
        })
        .promise()
    const promiseArr =
        rows.Items?.map((element) => {
            db.delete({
                TableName: tableName,
                Key: element
            }).promise()
        }) || []
    await Promise.all(promiseArr)
}
