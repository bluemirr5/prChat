import React, { useContext, useState } from "react";
import InfoContext from "../contexts/InfoContext";
import { io } from 'socket.io-client'

const Chat = () => {
  const [socket, setSocket] = useState(null)
  const [text, setText] = useState('')
  const [msgList, setMsgList] = useState([])
  const {id, room} = useContext(InfoContext)

  const addMsgDisplay = msg => {
    setMsgList(msgList.concat(msg))
  }

  const onClick = () => {
    const target = {roomId: room, content: text}
    setText('')
    socket.emit('c2s', target)
    addMsgDisplay(text)
  }

  const onClickConnect = () => {
    const clientSocket = io("/socket.io")
    setSocket(clientSocket)
    clientSocket.emit('joinRoom', {id, room})

    clientSocket.on('s2c', function(obj) {
      const totalMsg = "[" + obj.sender + "]" + obj.msg
      addMsgDisplay(totalMsg)
    })

    clientSocket.on('welcome', function(obj) {
      addMsgDisplay(obj.type + '가 입장하셨습니다.')
    })

    clientSocket.on('s2c-preMessage', function(list) {
      console.log(list)
      list.forEach(it => {
        addMsgDisplay(it)
      })
    })
  }

  return (
    <>
      <div>
        {id} / {room}
        <button onClick={onClickConnect}>연결</button>
      </div>
      <hr />
      <div id="chatArea">
        <input type="text" onChange={e => { setText(e.target.value) }}/>
        <button onClick={onClick}>보내기</button>
      </div>
      <div id="display">
        { msgList.map(msg => <p>{msg}</p>) }
      </div>
    </>
  );
};
export default Chat;
