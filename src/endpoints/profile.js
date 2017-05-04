import data from '../data/profile.json'

export default function(server) {
  server.get( '/profile', (req, res) => {
    res.send(data)
  })
  server.post( '/profile', (req, res) => {
    res.send(data)
  })
}
