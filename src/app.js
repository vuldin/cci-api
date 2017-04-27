import express from 'express'
import cfenv from 'cfenv'
import bodyParser from 'body-parser'
import gethistdata from './gethistdata'

let server = express()
let appEnv = cfenv.getAppEnv()

gethistdata(server)

server.listen(appEnv.port, () => {
  console.log(`server starting on ${appEnv.url}`)
})
