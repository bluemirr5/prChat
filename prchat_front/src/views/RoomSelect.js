import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../contexts/InfoContext";

const RoomSelect = () => {
  const {id, room, setRoom, externalData} = useContext(InfoContext)
  const navigate = useNavigate()
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
