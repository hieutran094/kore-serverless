import azureFunctionHandler from 'azure-aws-serverless-express'
import initDatabase from './database/index'
import { app } from './app'

export const handler = async () => {
    const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl=true&replicaSet=globaldb&retrywrites=false`
    await initDatabase(dbUrl)
    console.info('Connected to DB')
    return azureFunctionHandler(app)
}

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
/*
import serverlessExpress from '@vendia/serverless-express'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { app } from './app'
const cachedServerlessExpress = serverlessExpress({ app })

export const handler: AzureFunction = async (context, req) => {
    return cachedServerlessExpress(req, context)
}
*/
