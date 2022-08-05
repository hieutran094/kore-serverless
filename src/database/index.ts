import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const database: DocumentClient = process.env.IS_OFFLINE
    ? new DynamoDB.DocumentClient({
          region: 'localhost',
          endpoint: 'http://localhost:8000'
      })
    : new DynamoDB.DocumentClient()

export default database
