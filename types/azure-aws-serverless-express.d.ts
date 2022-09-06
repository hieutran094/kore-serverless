declare module 'azure-aws-serverless-express' {
    import { Express } from 'express'
    export function azureFunctionHandler(app: Express, binaryTypes?: any)
    export default azureFunctionHandler
}
