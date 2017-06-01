import request from 'superagent'
import dotenv from 'dotenv'

export default async function (server) {
  let data = []
  dotenv.config()
  const agent = request.agent()
  await agent
    .get('http://172.27.12.35:8009/cci/api/v1/login')
    .query({
      user: process.env.CCI_USER,
      password: process.env.CCI_PASSWORD
    })
    .then(async function () {
      try {
        data = await agent
          .get('http://172.27.12.35:8009/cci/api/v1/subscriber/histdata')
          .query({
            aggr: 'd',
            imsi: '272211221122000',
            timefrom: '20170601000000',
            timeto: '20170620000000'
          })
        data = JSON.parse(data.text)
      } catch (e) {
        console.log('error')
        console.log(e)
      }
    })
  server.get('/history', (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With')
    res.send(data)
  })
  server.post('/history', (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With')
    res.send(data)
  })
}
