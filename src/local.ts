import express from 'express'
import * as path from 'path'
import { app } from './app'

const port = process.env.PORT || 8080
const PROJECT_DIR = path.normalize(__dirname) + '/views'

app.use('/', express.static(path.join(PROJECT_DIR, '')))
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
