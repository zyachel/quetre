/// /////////////////////////////////////////////////////
//                      IMPORTS
/// /////////////////////////////////////////////////////
import dotenv from 'dotenv/config' // importing .env vars
import app from './app.js'
import log from './utils/log.js'

/// /////////////////////////////////////////////////////
//             HANDLING NODEJS ERRORS
/// /////////////////////////////////////////////////////
process.on('uncaughtException', err => {
  log(err, 'error')
  process.exit(1)
})

/// /////////////////////////////////////////////////////
//                 STARTING SERVER
/// /////////////////////////////////////////////////////
const port = process.env.PORT || 3000
const server = app.listen(port, () =>
  log(
    `server running in ${process.env.NODE_ENV} mode at port ${port}`,
    'success'
  )
)

process.on('unhandledRejection', err => {
  log(err, 'error')
  server.close(() => process.exit(1))
})
