
import serverlessExpress from '@vendia/serverless-express'
import { AzureFunction } from '@azure/functions'
import { app } from './app'
import initDatabase from './database/index'
const cachedServerlessExpress = serverlessExpress({ app })

export const handler: AzureFunction = async (context, req) => {
    const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=globaldb&retrywrites=false`
    await initDatabase(dbUrl)
    context.log('⚡️[server]: Connected to DB')
    return cachedServerlessExpress(context, req)
}

/*
const azureFunctionHandler = require('azure-aws-serverless-express')
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import initDatabase from './database/index'
import { app } from './app'

export const handler: AzureFunction = async (
    context: Context,
    req: HttpRequest
) => {
    const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=globaldb&retrywrites=false`
    await initDatabase(dbUrl)
    console.info('⚡️[server]: Connected to DB')
    const expressHandler = azureFunctionHandler(app)
    return expressHandler(context, req)
}
*/

/*
import serverlessHttp from 'serverless-http'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { app } from './app'

const httpHandler = serverlessHttp(app, { provider: 'azure' })

export const handler: AzureFunction = async (
    context: Context,
    req: HttpRequest
): Promise<void> => {
    context.res = await httpHandler(req, context)
}
*/