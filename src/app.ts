import express from 'express' // javascrip 2015
import { Server } from 'socket.io'

import * as http from 'http'

const app = express()
const server = http.createServer(app)
const websocketServer = new Server(server)

app.use(express.static('static'))

app.post('/api', (req, res) => {
  const resultModel = {
    name: 'wgs',
    age: 41,
    gender: 'M',
  }
  res.send(resultModel)
})

app.get('/', (req, resp) => {
  resp.send('<h1>hello</h1>')
})

app.get('/wgs', (req, resp) => {
  resp.send('<h1>wgs</h1>')
})

server.listen(3000, () => {
  console.log('server load....')
})

const wsListen = websocketServer.of('/socket.io')
wsListen.on('connection', serverSocket => {
  console.log('소켓 요청이 와서 서버 소캣을 만들었어요 - ' + serverSocket.id)
  serverSocket.on('disconnect', reason => {
    console.log(reason)
  })
})
