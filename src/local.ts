import express from 'express'
import * as path from 'path'
import { app } from './app'
import initDatabase from './database/index'

const main = async () => {
    const port = process.env.EXPRESS_PORT || 8080
    const PROJECT_DIR = path.normalize(path.join(__dirname, '../public'))
    const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    await initDatabase(dbUrl)
    console.info('⚡️[server]: Connected to DB')
    app.use('/', express.static(path.join(PROJECT_DIR, '')))
    app.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${port}`
        )
    })
}
main()
