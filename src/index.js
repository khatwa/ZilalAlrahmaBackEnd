import express from 'express'
import { PORT, HOST } from './Configs/env'
import { logger } from './Utils'
import { catch404, handleErrors } from './Utils/errors'

// import all of our routes
import Router from './Routes/'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logger
logger(app)
// use all routes in our app
app.use(Router)

// catch 404s
catch404(app)

// Error Handler
handleErrors(app)

app.listen(PORT, () =>
  console.log(
    `Server connected, please use http://${HOST}:${PORT} to consume this api.`
  )
)
