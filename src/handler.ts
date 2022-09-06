import azureFunctionHandler from 'azure-aws-serverless-express'
import { app } from './app'

export const handler = azureFunctionHandler(app)

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
