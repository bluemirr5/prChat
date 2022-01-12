import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoomSelect = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [id, setId] = useState(location.state.id)
  const [room, setRoom] = useState('')
  const onNext = () => {
    navigate('/chat', {state: {id, room}})
  }
  return (
    <>
      <div>
        <span>User :</span>{id}
      </div>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={onNext}>{room} 방에 입장</button>
    </>
  );
};
export default RoomSelect;
