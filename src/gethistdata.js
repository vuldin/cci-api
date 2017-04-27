import data from '../data/gethistdata'

export default function(server) {
  server.post( '/gethistdata', (req, res) => {
    res.send(data)
  })
}
