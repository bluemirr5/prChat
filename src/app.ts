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
const msgList: Map<string, Array<string>> = new Map()
// const msgList: Array<string> = []

const wsListen = websocketServer.of('/socket.io')
wsListen.on('connection', serverSocket => {
  console.log('소켓 요청이 와서 서버 소캣을 만들었어요 - ' + serverSocket.id)
  serverSocket.on('disconnect', reason => {
    console.log(reason)
  })

  serverSocket.on('joinRoom', obj => {
    mapSocketIduserId.set(serverSocket.id, obj.id)
    serverSocket.join(obj.room)

    let roomMsgList = msgList.get(obj.room)
    if (!roomMsgList) {
      roomMsgList = new Array<string>()
      msgList.set(obj.room, new Array<string>())
    }

    serverSocket.to(obj.room).emit('welcome', { name: 'welcome', type: obj.id })
    // serverSocket.broadcast.emit('welcome', { name: 'welcome', type: obj.id })

    console.log(obj.room)
    console.log(roomMsgList)
    serverSocket.emit('s2c-preMessage', roomMsgList)
  })

  serverSocket.on('c2s', target => {
    const speaker = mapSocketIduserId.get(serverSocket.id)
    console.log(speaker, target)
    const roomMsgList = msgList.get(target.roomId)
    console.log(roomMsgList)
    if (roomMsgList) roomMsgList.push('[' + speaker + '] ' + target.content)
    serverSocket
      .to(target.roomId)
      .emit('s2c', { sender: speaker, msg: target.content })
  })
})

type MsgItem = {
  id: string
  msg: string
}
