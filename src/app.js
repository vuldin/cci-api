import express from 'express'
import cfenv from 'cfenv'
import bodyParser from 'body-parser'
import history from './endpoints/history'
import profile from './endpoints/profile'

let server = express()
let appEnv = cfenv.getAppEnv()

history(server)
profile(server)

server.listen(appEnv.port, () => console.log(`server starting on ${appEnv.url}`) )
