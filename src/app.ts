import express from 'express' // javascrip 2015
import { Server as SocketServer } from 'socket.io'

import * as http from 'http'

const app = express()
const server = http.createServer(app)
const websocketServer = new SocketServer(server)

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

server.listen(3003, () => {
  console.log('server load....')
})

const mapSocketIduserId = new Map<string, string>()

const msgList: Array<string> = []

const wsListen = websocketServer.of('/socket.io')
wsListen.on('connection', serverSocket => {
  console.log('소켓 요청이 와서 서버 소캣을 만들었어요 - ' + serverSocket.id)
  serverSocket.on('disconnect', reason => {
    console.log(reason)
  })

  serverSocket.on('setMe', obj => {
    console.log('setMe', obj, serverSocket.id)
    mapSocketIduserId.set(serverSocket.id, obj.id)
    serverSocket.broadcast.emit('welcome', { name: 'welcome', type: obj.id })
    serverSocket.emit('s2c-preMessage', msgList)
  })

  serverSocket.on('c2s', text => {
    const speaker = mapSocketIduserId.get(serverSocket.id)
    console.log(speaker, text)
    msgList.push('[' + speaker + '] ' + text)
    serverSocket.broadcast.emit('s2c', { sender: speaker, msg: text })
  })
})

type MsgItem = {
  id: string
  msg: string
}
