import data from '../../data/profile.json'

export default function(server) {
  server.get( '/profile', (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With')
    res.send(data)
  })
  server.post( '/profile', (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With')
    res.send(data)
  })
}
