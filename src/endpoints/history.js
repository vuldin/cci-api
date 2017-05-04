import data from '../data/history.json'

export default function(server) {
  server.get( '/history', (req, res) => {
    res.send(data)
  })
  server.post( '/history', (req, res) => {
    res.send(data)
  })
}
